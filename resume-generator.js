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
  .then(data => { masterData = data; })
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

