import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load local keys directly from disk root
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

export default async function handler(req, res) {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Local-only Guardrail: Reject requests if running on Vercel Production/Preview
  if (process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview') {
    return res.status(403).json({ error: 'AI Resume Tailoring is restricted to local execution.' });
  }

  try {
    const { jobDescription } = req.body;
    if (!jobDescription || !jobDescription.trim()) {
      return res.status(400).json({ error: 'Job description is required.' });
    }

    const filePath = path.join(process.cwd(), 'master-resume.json');
    if (!fs.existsSync(filePath)) {
      throw new Error(`master-resume.json not found at path: ${filePath}`);
    }

    const masterDataRaw = fs.readFileSync(filePath, 'utf8');
    const masterData = JSON.parse(masterDataRaw);

    const provider = (process.env.LLM_PROVIDER || 'openai').toLowerCase();

    const prompt = `
You are an expert executive resume writer. Your job is to analyze the provided Job Description (JD) and tailor John Riley's Master Resume data to create a high-impact, targeted resume.

### Candidate Master Data:
${JSON.stringify(masterData, null, 2)}

### Target Job Description:
${jobDescription}

### Instructions:
1. Write a custom, punchy 2-sentence Professional Summary targeted directly at the key outcomes in the JD.
2. Select the top 3 most relevant bullet points for each experience. Reword or highlight key terms to align with the JD without exaggerating or falsifying facts.
3. Select the 6 most relevant key proficiencies/skills.
4. Select the 3 most relevant speaking engagements.
5. Return ONLY a valid, raw JSON object matching this exact structure (no markdown formatting, no code block backticks):

{
  "summary": "Tailored 2-sentence summary...",
  "experiences": [
    {
      "company": "Company Name",
      "position": "Title",
      "startYear": 2017,
      "endYear": null,
      "bullets": ["Selected bullet 1", "Selected bullet 2", "Selected bullet 3"]
    }
  ],
  "proficiencies": ["Skill 1", "Skill 2", "Skill 3", "Skill 4", "Skill 5", "Skill 6"],
  "speaking": [
    { "title": "Talk Title", "venue": "Venue", "year": "2026" }
  ]
}
`;

    let rawText = '';

    // ==========================================
    // ROUTE: OpenAI (GPT-4o / GPT-4o-mini)
    // ==========================================
    if (provider === 'openai') {
      console.log('Current Working Directory:', process.cwd());
      console.log('OPENAI_API_KEY Present?:', Boolean(process.env.OPENAI_API_KEY));      
      console.log("Using OpenAI provider for resume tailoring." + (process.env.OPENAI_MODEL ? ` Model: ${process.env.OPENAI_MODEL}` : ''));
      
      const apiKey = process.env.OPENAI_API_KEY;
      const model = process.env.OPENAI_MODEL || 'gpt-4o';

      if (!apiKey) {
        return res.status(500).json({ error: 'OPENAI_API_KEY environment variable is not set.' });
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: "You output raw, valid JSON only." },
            { role: "user", content: prompt }
          ]
        })
      });

      const aiData = await response.json();

      if (!response.ok) {
        console.error('OpenAI API Error:', JSON.stringify(aiData, null, 2));
        return res.status(500).json({ error: 'OpenAI API call failed.', details: aiData.error?.message || aiData });
      }

      rawText = aiData.choices[0].message.content;

    // ==========================================
    // ROUTE: Google Gemini
    // ==========================================
    } else {
      const apiKey = process.env.GEMINI_API_KEY;
      const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is not set.' });
      }

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            response_mime_type: "application/json"
          }
        })
      });

      const aiData = await response.json();

      if (!response.ok || !aiData.candidates) {
        console.error('Gemini API Error Detail:', JSON.stringify(aiData, null, 2));
        return res.status(500).json({ error: 'Gemini API call failed.', details: aiData.error?.message || aiData });
      }

      rawText = aiData.candidates[0].content.parts[0].text;
    }

    // Clean markdown wrappers if returned and parse
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const tailoredResume = JSON.parse(rawText);

    return res.status(200).json(tailoredResume);

  } catch (error) {
    console.error('Tailor API error:', error);
    return res.status(500).json({ error: 'Failed to generate tailored resume.', details: error.message });
  }
}