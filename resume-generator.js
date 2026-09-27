// ==========================================
// Environment & Configuration Setup
// ==========================================
const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Replace 'johnriley-dev' with your exact Vercel deployment URL if different
const VERCEL_PRODUCTION_URL = 'https://johnriley-dev.vercel.app/api/tailor';

const ENDPOINT_URL = IS_LOCAL 
  ? 'http://localhost:3000/api/tailor' 
  : VERCEL_PRODUCTION_URL;

let masterData = null;

// Pre-load Master Data for local keyword matching engine
fetch('master-resume.json')
  .then(res => res.json())
  .then(data => { 
    masterData = data; 
    window.masterResumeData = data; // Assign to window object
  })
  .catch(err => console.error("Error loading master resume data:", err));

// Hide or remove the button completely on production (johnriley.dev)
document.addEventListener('DOMContentLoaded', () => {
  const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const aiBtn = document.getElementById('generateBtn');

  if (aiBtn && !IS_LOCAL) {
    // Hide or remove the button completely on production (johnriley.dev)
    aiBtn.style.display = 'none';
  }
});

function renderAIPreview(data) {
  // Save active dataset globally for DOCX export
  window.currentTailoredResume = data;

  const previewDiv = document.getElementById('resumePreview');
  // ... rest of renderAIPreview code ...
}

// docx generator
document.addEventListener('DOMContentLoaded', () => {
  const docxBtn = document.getElementById('downloadDocxBtn');

  if (docxBtn) {
    docxBtn.addEventListener('click', () => {
      const dataToExport = window.currentTailoredResume || window.masterResumeData;

      if (!dataToExport) {
        alert("No resume data available to export.");
        return;
      }

      // Format master data if raw masterResumeData is used directly
      let formatted = dataToExport;
      if (!dataToExport.summary && dataToExport.basics) {
        formatted = {
          summary: dataToExport.basics.summary,
          experiences: dataToExport.experiences.map(exp => ({
            company: exp.company,
            position: exp.position,
            startYear: exp.startYear,
            endYear: exp.endYear,
            bullets: exp.bullets.slice(0, 3).map(b => typeof b === 'string' ? b : b.text)
          })),
          proficiencies: dataToExport.proficiencies.slice(0, 6).map(p => typeof p === 'string' ? p : p.name),
          speaking: dataToExport.speaking.slice(0, 3).map(s => ({
            title: s.title,
            venue: s.venue,
            year: s.date ? s.date.split('-')[0] : '2026'
          }))
        };
      }

      downloadDOCX(formatted);
    });
  }
});

// ==========================================
// Option A: Client-Side Keyword Scoring
// ==========================================
function extractTokens(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s#\+\.-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

function scoreItem(itemText, itemTags, jobTokens) {
  let score = 0;
  const combinedText = (itemText + " " + (itemTags ? itemTags.join(" ") : "")).toLowerCase();
  
  jobTokens.forEach(token => {
    if (combinedText.includes(token)) {
      score += 1;
      if (itemTags && itemTags.some(t => t.toLowerCase() === token)) {
        score += 2;
      }
    }
  });
  return score;
}

function generateTailoredResume() {
  const jdText = document.getElementById('jdInput').value;
  if (!jdText.trim()) {
    alert("Please paste a job description first!");
    return;
  }

  if (!masterData) {
    alert("Master resume data is still loading. Please try again in a moment.");
    return;
  }

  const jobTokens = extractTokens(jdText);

  // Score & Select Bullets
  const experiences = masterData.experiences.map(exp => {
    const scoredBullets = exp.bullets.map(b => ({
      ...b,
      score: scoreItem(b.text, b.tags, jobTokens)
    })).sort((a, b) => b.score - a.score);

    return {
      company: exp.company,
      position: exp.position,
      startYear: exp.startYear,
      endYear: exp.endYear,
      bullets: scoredBullets.slice(0, 3).map(b => b.text)
    };
  });

  // Score & Select Skills
  const scoredProficiencies = masterData.proficiencies.map(p => ({
    ...p,
    score: scoreItem(p.name + " " + p.category, p.tags, jobTokens)
  })).sort((a, b) => b.score - a.score);

  // Score & Select Presentations
  const scoredSpeaking = masterData.speaking.map(s => ({
    ...s,
    score: scoreItem(s.title + " " + s.venue, s.tags, jobTokens)
  })).sort((a, b) => b.score - a.score);

  const formattedData = {
    summary: masterData.basics.summary,
    experiences: experiences,
    proficiencies: scoredProficiencies.slice(0, 6).map(p => p.name),
    speaking: scoredSpeaking.slice(0, 3).map(s => ({
      title: s.title,
      venue: s.venue,
      year: s.date.split('-')[0]
    }))
  };

  renderAIPreview(formattedData);
}

// ==========================================
// Option B: Serverless Vercel AI Generation
// ==========================================
async function generateAITailoredResume() {
  const jdText = document.getElementById('jdInput').value;
  if (!jdText.trim()) {
    alert("Please paste a job description first!");
    return;
  }

  const generateBtn = document.getElementById('generateBtn');
  const originalText = generateBtn ? generateBtn.innerHTML : '';
  
  if (generateBtn) {
    generateBtn.disabled = true;
    generateBtn.innerHTML = '⚡ Tailoring with AI...';
  }

  try {
    console.log(`Sending request to endpoint: ${ENDPOINT_URL}`);
    
    const response = await fetch(ENDPOINT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jobDescription: jdText })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server responded with status ${response.status}`);
    }

    const tailoredData = await response.json();
    renderAIPreview(tailoredData);

  } catch (err) {
    alert("Error generating resume: " + err.message);
    console.error("Tailor API Error:", err);
  } finally {
    if (generateBtn) {
      generateBtn.disabled = false;
      generateBtn.innerHTML = originalText;
    }
  }
}

// ==========================================
// Rendering & PDF Generator Engine
// ==========================================
function renderAIPreview(data) {
  const previewDiv = document.getElementById('resumePreview');

  let html = `
    <div id="pdfContainer" class="pdf-page font-sans text-gray-800 border shadow-lg mx-auto bg-white p-6">
      <!-- Header -->
      <div class="border-b-2 border-blue-600 pb-3 mb-4 text-center">
        <h1 class="text-2xl font-bold text-gray-900">John Riley</h1>
        <p class="text-md text-blue-700 font-semibold">Principal Agile Coach & Professional Scrum Trainer (PST)</p>
        <p class="text-xs text-gray-600">Columbus, OH | john@readysetagile.com | https://johnriley.dev</p>
      </div>

      <!-- Professional Profile -->
      <div class="mb-4 pdf-block">
        <h2 class="text-sm font-bold border-b text-gray-800 pb-1 mb-1 uppercase tracking-wide">Professional Profile</h2>
        <p class="text-xs text-gray-700 leading-relaxed">${data.summary}</p>
      </div>

      <!-- Relevant Experience -->
      <div class="mb-4 pdf-block">
        <h2 class="text-sm font-bold border-b text-gray-800 pb-1 mb-2 uppercase tracking-wide">Relevant Experience</h2>
        ${data.experiences.map(exp => `
          <div class="mb-3 pdf-block">
            <div class="flex justify-between items-baseline">
              <h3 class="font-bold text-xs text-gray-900">${exp.position} <span class="text-blue-600">@ ${exp.company}</span></h3>
              <span class="text-[10px] text-gray-500 font-medium">${exp.startYear} -${exp.endYear ? exp.endYear : 'Present'}</span>
            </div>
            <ul class="list-disc list-inside text-[11px] text-gray-700 mt-1 space-y-0.5">
              ${exp.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <!-- Key Proficiencies -->
      <div class="mb-4 pdf-block">
        <h2 class="text-sm font-bold border-b text-gray-800 pb-1 mb-1 uppercase tracking-wide">Key Proficiencies</h2>
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${data.proficiencies.map(skill => `
            <span class="bg-gray-100 text-gray-800 text-[10px] px-2 py-0.5 rounded border border-gray-300 font-medium">
              ${skill}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Selected Presentations -->
      <div class="pdf-block">
        <h2 class="text-sm font-bold border-b text-gray-800 pb-1 mb-1 uppercase tracking-wide">Selected Presentations</h2>
        <ul class="text-[11px] text-gray-700 space-y-0.5">
          ${data.speaking.map(s => `
            <li><strong>${s.title}</strong> — <em>${s.venue}</em> (${s.year})</li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;

  previewDiv.innerHTML = html;
  
  // Close input modal and reveal generator/PDF modal
  const jdModal = document.getElementById('jdModal');
  if (jdModal) jdModal.classList.add('hidden');
  
  document.getElementById('generatorModal').classList.remove('hidden');
}

function downloadPDF() {
  const element = document.getElementById('pdfContainer');
  const opt = {
    margin:       0,
    filename:     'John_Riley_Resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true, logging: false },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
    pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
  };

  html2pdf().set(opt).from(element).save();
}

function closeModal() {
  document.getElementById('generatorModal').classList.add('hidden');
}

function downloadDOCX(data) {
  const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, TabStopType, TabStopPosition } = docx;

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Arial",
            size: 20, // 10pt base font
            color: "374151" // Gray-700
          }
        }
      }
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 720, bottom: 720, left: 720, right: 720 } // 0.5 in margins
        }
      },
      children: [
        // Header
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "John Riley", bold: true, size: 32, font: "Arial", color: "111827" }),
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 60, after: 60 },
          children: [
            new TextRun({ text: "Principal Agile Coach & Professional Scrum Trainer (PST)", bold: true, color: "1D4ED8", size: 22, font: "Arial" }),
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 180 },
          border: { bottom: { color: "1D4ED8", space: 6, value: BorderStyle.SINGLE, size: 12 } },
          children: [
            new TextRun({ text: "Columbus, OH | john@readysetagile.com | https://johnriley.dev", size: 18, color: "4B5563", font: "Arial" }),
          ]
        }),

        // Professional Profile
        new Paragraph({
          spacing: { before: 180, after: 80 },
          border: { bottom: { color: "D1D5DB", space: 2, value: BorderStyle.SINGLE, size: 6 } },
          children: [
            new TextRun({ text: "PROFESSIONAL PROFILE", bold: true, font: "Arial", size: 20, color: "111827" })
          ]
        }),
        new Paragraph({
          spacing: { after: 180, line: 276 },
          children: [
            new TextRun({ text: data.summary, font: "Arial", size: 20 })
          ]
        }),

        // Relevant Experience
        new Paragraph({
          spacing: { before: 180, after: 120 },
          border: { bottom: { color: "D1D5DB", space: 2, value: BorderStyle.SINGLE, size: 6 } },
          children: [
            new TextRun({ text: "RELEVANT EXPERIENCE", bold: true, font: "Arial", size: 20, color: "111827" })
          ]
        }),
        ...data.experiences.flatMap(exp => [
          new Paragraph({
            spacing: { before: 120, after: 40 },
            tabStops: [{ type: TabStopType.RIGHT, position: TabStopPosition.MAX }],
            children: [
              new TextRun({ text: exp.position, bold: true, font: "Arial", size: 20, color: "111827" }),
              new TextRun({ text: ` @ ${exp.company}`, bold: true, font: "Arial", color: "1D4ED8", size: 20 }),
              new TextRun({ text: `\t${exp.startYear} - ${exp.endYear || 'Present'}`, font: "Arial", color: "6B7280", size: 18 })
            ]
          }),
          ...exp.bullets.map(b => new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40, line: 260 },
            children: [
              new TextRun({ text: b, font: "Arial", size: 19 })
            ]
          }))
        ]),

        // Key Proficiencies
        new Paragraph({
          spacing: { before: 200, after: 100 },
          border: { bottom: { color: "D1D5DB", space: 2, value: BorderStyle.SINGLE, size: 6 } },
          children: [
            new TextRun({ text: "KEY PROFICIENCIES", bold: true, font: "Arial", size: 20, color: "111827" })
          ]
        }),
        new Paragraph({
          spacing: { after: 180 },
          children: data.proficiencies.map(skill => new TextRun({
            text: `  ${skill}  `,
            shading: { fill: "F3F4F6" },
            font: "Arial",
            size: 18
          })).reduce((prev, curr) => [...prev, curr, new TextRun({ text: "  " })], [])
        }),

        // Selected Presentations / Public Engagements
        ...(data.speaking && data.speaking.length > 0 ? [
          new Paragraph({
            spacing: { before: 200, after: 100 },
            border: { bottom: { color: "D1D5DB", space: 2, value: BorderStyle.SINGLE, size: 6 } },
            children: [
              new TextRun({ text: "SELECTED PRESENTATIONS", bold: true, font: "Arial", size: 20, color: "111827" })
            ]
          }),
          ...data.speaking.map(s => new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 40 },
            children: [
              new TextRun({ text: s.title, bold: true, font: "Arial", size: 19, color: "111827" }),
              new TextRun({ text: ` — `, font: "Arial", size: 19 }),
              new TextRun({ text: s.venue, italics: true, font: "Arial", size: 19 }),
              new TextRun({ text: ` (${s.year})`, font: "Arial", size: 19, color: "6B7280" })
            ]
          }))
        ] : [])
      ]
    }]
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, "John_Riley_Resume.docx");
  });
}