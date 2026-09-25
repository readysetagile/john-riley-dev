let masterData = null;

// Load data on page launch
fetch('master-resume.json')
  .then(res => res.json())
  .then(data => { masterData = data; })
  .catch(err => console.error("Error loading master resume data:", err));

// Utility to extract clean search tokens from a raw Job Description
function extractTokens(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s#\+\.-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
}

// Score a item based on token matches in its text and explicit tags
function scoreItem(itemText, itemTags, jobTokens) {
  let score = 0;
  const combinedText = (itemText + " " + (itemTags ? itemTags.join(" ") : "")).toLowerCase();
  
  jobTokens.forEach(token => {
    if (combinedText.includes(token)) {
      score += 1;
      // Bonus if exact tag match
      if (itemTags && itemTags.some(t => t.toLowerCase() === token)) {
        score += 2;
      }
    }
  });
  return score;
}

// Main Tailoring Function
function generateTailoredResume() {
  const jdText = document.getElementById('jdInput').value;
  if (!jdText.trim()) {
    alert("Please paste a job description first!");
    return;
  }

  const jobTokens = extractTokens(jdText);

  // 1. Score & Select Bullet Points per Experience
  const tailoredExperiences = masterData.experiences.map(exp => {
    const scoredBullets = exp.bullets.map(b => ({
      ...b,
      score: scoreItem(b.text, b.tags, jobTokens)
    }));

    // Sort bullets by relevance score (highest first)
    scoredBullets.sort((a, b) => b.score - a.score);

    return {
      ...exp,
      // Select top 3 bullets per job, or all if scores are equal
      selectedBullets: scoredBullets.slice(0, 3)
    };
  });

  // 2. Score & Select Top Proficiencies
  const scoredProficiencies = masterData.proficiencies.map(p => ({
    ...p,
    score: scoreItem(p.name + " " + p.category, p.tags, jobTokens)
  })).sort((a, b) => b.score - a.score);

  // 3. Score & Select Top Speaking Engagements
  const scoredSpeaking = masterData.speaking.map(s => ({
    ...s,
    score: scoreItem(s.title + " " + s.venue, s.tags, jobTokens)
  })).sort((a, b) => b.score - a.score);

  // Render HTML Output into Modal
  renderResumePreview(tailoredExperiences, scoredProficiencies.slice(0, 5), scoredSpeaking.slice(0, 3));
}

function renderResumePreview(experiences, proficiencies, speaking) {
  const previewDiv = document.getElementById('resumePreview');
  
  let html = `
    <div id="pdfContainer" class="p-8 bg-white text-gray-800 font-sans max-w-4xl mx-auto border shadow-lg">
      <!-- Header -->
      <div class="border-b-2 border-blue-600 pb-4 mb-6 text-center">
        <h1 class="text-3xl font-bold text-gray-900">${masterData.basics.name}</h1>
        <p class="text-lg text-blue-700 font-semibold">${masterData.basics.title}</p>
        <p class="text-sm text-gray-600">${masterData.basics.location} | ${masterData.basics.email} | ${masterData.basics.website}</p>
      </div>

      <!-- Executive Summary -->
      <div class="mb-6">
        <h2 class="text-xl font-bold border-b text-gray-800 pb-1 mb-2 uppercase tracking-wide">Professional Profile</h2>
        <p class="text-sm text-gray-700 leading-relaxed">${masterData.basics.summary}</p>
      </div>

      <!-- Professional Experience -->
      <div class="mb-6">
        <h2 class="text-xl font-bold border-b text-gray-800 pb-1 mb-3 uppercase tracking-wide">Relevant Experience</h2>
        ${experiences.map(exp => `
          <div class="mb-4">
            <div class="flex justify-between items-baseline">
              <h3 class="font-bold text-md text-gray-900">${exp.position} <span class="text-blue-600">@ ${exp.company}</span></h3>
              <span class="text-xs text-gray-500 font-medium">${exp.startYear} -${exp.endYear ? exp.endYear : 'Present'}</span>
            </div>
            <ul class="list-disc list-inside text-xs text-gray-700 mt-1 space-y-1">
              ${exp.selectedBullets.map(b => `<li>${b.text}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <!-- Relevant Proficiencies & Skills -->
      <div class="mb-6">
        <h2 class="text-xl font-bold border-b text-gray-800 pb-1 mb-2 uppercase tracking-wide">Key Proficiencies</h2>
        <div class="flex flex-wrap gap-2 pt-1">
          ${proficiencies.map(p => `
            <span class="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded border border-gray-300 font-medium">
              ${p.name}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Speaking Engagements -->
      <div>
        <h2 class="text-xl font-bold border-b text-gray-800 pb-1 mb-2 uppercase tracking-wide">Selected Presentations</h2>
        <ul class="text-xs text-gray-700 space-y-1">
          ${speaking.map(s => `
            <li><strong>${s.title}</strong> — <em>${s.venue}</em> (${s.date.split('-')[0]})</li>
          `).join('')}
        </ul>
      </div>
    </div>
  `;

  previewDiv.innerHTML = html;
  document.getElementById('generatorModal').classList.remove('hidden');
}

// Download PDF directly from browser
function downloadPDF() {
  const element = document.getElementById('pdfContainer');
  const opt = {
    margin:       0.5,
    filename:     'John_Riley_Resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(element).save();
}

function closeModal() {
  document.getElementById('generatorModal').classList.add('hidden');
}