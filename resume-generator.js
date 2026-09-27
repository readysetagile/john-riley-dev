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

// ==========================================
// Shared export data resolution (PDF + DOCX)
// ==========================================
// Both exports use the tailored resume when one has been generated and fall
// back to the master resume otherwise, so the downloaded file always matches
// what is shown in the Tailored Resume Preview.
function buildExportData() {
  const source = window.currentTailoredResume || window.masterResumeData;
  if (!source) return null;

  let formatted = source;

  // Format raw master data (which nests details under `basics`) for export.
  if (!source.summary && source.basics) {
    formatted = {
      summary: source.basics.summary,
      experiences: source.experiences.map(exp => ({
        company: exp.company,
        position: exp.position,
        startYear: exp.startYear,
        endYear: exp.endYear,
        bullets: exp.bullets.slice(0, 3).map(b => typeof b === 'string' ? b : b.text)
      })),
      proficiencies: source.proficiencies.slice(0, 6).map(p => typeof p === 'string' ? p : p.name),
      speaking: source.speaking.slice(0, 3).map(s => ({
        title: s.title,
        venue: s.venue,
        year: s.date ? s.date.split('-')[0] : '2026'
      }))
    };
  }

  // Key Certifications are always selected locally from the job description.
  if (!formatted.certifications || !formatted.certifications.length) {
    const jdElement = document.getElementById('jdInput');
    formatted.certifications = selectKeyCertifications(jdElement ? jdElement.value : '', 5);
  }

  return formatted;
}

// docx generator
document.addEventListener('DOMContentLoaded', () => {
  const docxBtn = document.getElementById('downloadDocxBtn');

  if (docxBtn) {
    docxBtn.addEventListener('click', () => {
      const dataToExport = buildExportData();

      if (!dataToExport) {
        alert("No resume data available to export.");
        return;
      }

      downloadDOCX(dataToExport);
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

// ==========================================
// Local Key Certification Selection Engine
// ==========================================
// Picks the N certifications from certifications.js that best match the job
// description. This is a strictly LOCAL decision: no AI call and no internet
// research are involved. It reuses the same tokenising/scoring primitives as
// the client-side keyword matcher above.
function selectKeyCertifications(jdText, count) {
  const requested = count || 5;
  const catalog = window.certificationCatalog || [];
  const jobTokens = extractTokens(jdText || '');

  if (!catalog.length) return [];

  // Official Scrum.org wording for every certification, used to measure how
  // much of the job description's language each certification actually covers.
  const skillProfiles = catalog.map(cert =>
    (cert.name + ' ' + (cert.synopsis || '') + ' ' + (cert.keyLearnings || []).join(' ')).toLowerCase()
  );

  // Inverse document frequency: a word shared by every certification carries
  // almost no signal, while a word unique to one certification carries a lot.
  // This stops generic JD wording (team, value, work, delivery) from dominating.
  const docFrequency = {};
  jobTokens.forEach(function (token) {
    let df = 0;
    skillProfiles.forEach(function (profile) {
      if (profile.indexOf(token) !== -1) df++;
    });
    docFrequency[token] = df;
  });

  const scored = catalog.map((cert, index) => {
    let score = 0;

    // Strong signal: the JD contains this certification's domain keywords.
    (cert.tags || []).forEach(tag => {
      const parts = tag.toLowerCase().split(/\s+/).filter(p => p.length > 2);
      if (!parts.length) return;
      const hits = parts.filter(p => jobTokens.indexOf(p) !== -1).length;
      if (hits === parts.length) {
        score += 6;                        // whole keyword phrase matched
      } else if (hits > 0) {
        score += 2 * (hits / parts.length); // partial keyword phrase matched
      }
    });

    // Weaker signal: distinctive JD words that appear in this certification's
    // official synopsis and learning objectives.
    jobTokens.forEach(token => {
      if (skillProfiles[index].indexOf(token) !== -1) {
        score += 2 / docFrequency[token];
      }
    });

    return Object.assign({}, cert, { score: score });
  });

  // Deterministic ordering: relevance first, then badge weight, then name.
  scored.sort((a, b) =>
    b.score - a.score || b.weight - a.weight || a.name.localeCompare(b.name)
  );

  // Always return exactly `requested` entries. If fewer certifications matched
  // the JD, fill the remainder with the highest weighted certifications (the
  // same fallback pattern already used for speaking engagements).
  const picked = scored.slice(0, requested);
  if (picked.length < requested) {
    const chosen = picked.map(c => c.id);
    scored.forEach(cert => {
      if (picked.length < requested && chosen.indexOf(cert.id) === -1) {
        picked.push(cert);
        chosen.push(cert.id);
      }
    });
  }

  return picked;
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
  // Save the active dataset globally so the PDF and DOCX exports use the same
  // tailored resume that is displayed in the preview.
  window.currentTailoredResume = data;

  // Key Certifications are always resolved LOCALLY from the job description, so
  // the decision never depends on AI or internet research. This runs for both
  // the client-side keyword generator and the AI endpoint response.
  const jdElement = document.getElementById('jdInput');
  data.certifications = selectKeyCertifications(jdElement ? jdElement.value : '', 5);

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

      <!-- Key Certifications -->
      <div class="mb-4 pdf-block">
        <h2 class="text-sm font-bold border-b text-gray-800 pb-1 mb-1 uppercase tracking-wide">Key Certifications</h2>
        <div class="flex flex-wrap gap-1 pt-1">
          ${data.certifications.map(cert => `
            <span class="bg-gray-100 text-gray-800 text-[10px] px-2 py-0.5 rounded border border-gray-300 font-medium" title="${cert.synopsis}">
              ${cert.shortName || cert.name}
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
  const data = buildExportData();

  if (!data) {
    alert("No resume data available to export.");
    return;
  }

  downloadResumePDF(data);
}

// ==========================================
// PDF Generator - programmatic, text-based output
// ==========================================
// The PDF is written directly with jsPDF text/fill calls instead of being
// rasterised from the HTML preview. That means:
//   * the PDF has a real, selectable text layer (searchable and readable by
//     ATS/parsing tools, unlike an html2canvas image),
//   * there is no leftover whitespace at the top of page 1, and
//   * content flows onto extra pages instead of being clipped to one page.
function downloadResumePDF(data) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("The PDF library did not load. Please check your connection and try again.");
    return;
  }

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF({ unit: 'pt', format: 'letter', orientation: 'portrait' });

  // Letter page maths (72pt per inch).
  const PAGE_W = 612;
  const PAGE_H = 792;
  const MARGIN = 40;
  const RIGHT = PAGE_W - MARGIN;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  const BOTTOM = PAGE_H - MARGIN;

  // Palette mirrors the preview (Tailwind gray/blue scale).
  const INK     = [17, 24, 39];    // gray-900
  const BODY    = [55, 65, 81];    // gray-700
  const MUTED   = [107, 114, 128]; // gray-500
  const BLUE    = [29, 78, 216];   // blue-700
  const RULE    = [209, 213, 219]; // gray-300
  const CHIP_BG = [243, 244, 246]; // gray-100

  const FONT = 'helvetica';
  let y = MARGIN;

  // Break to a new page when `needed` points will not fit. Returns true when a
  // page was added so callers can reset their horizontal position.
  const ensure = (needed) => {
    if (y + needed > BOTTOM) {
      doc.addPage();
      y = MARGIN;
      return true;
    }
    return false;
  };

  const setStyle = (size, style, color) => {
    doc.setFont(FONT, style || 'normal');
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
  };

  // Single-style wrapped paragraph. `y` always tracks the top of the next block.
  const paragraph = (text, opts) => {
    const o = opts || {};
    const size = o.size || 9.5;
    const lineH = o.lineHeight || size * 1.32;
    const indent = o.indent || 0;
    const width = o.width || (CONTENT_W - indent);

    setStyle(size, o.style, o.color || BODY);
    const lines = doc.splitTextToSize(String(text === null || text === undefined ? '' : text), width);

    ensure(lines.length * lineH + (o.after || 0) + (o.bullet ? 3 : 0));

    if (o.bullet) {
      doc.setFillColor(BODY[0], BODY[1], BODY[2]);
      doc.circle(MARGIN + 2.5, y + size * 0.42, 1.2, 'F');
    }

    doc.text(lines, MARGIN + indent, y + size);
    y += lines.length * lineH + (o.after || 0);
  };

  // A row of differently styled fragments (e.g. bold title + blue company).
  // Drawn inline when the whole row fits; otherwise each fragment becomes its
  // own wrapped block. This avoids ever drawing overlapping or clipped text.
  const inline = (segments, opts) => {
    const o = opts || {};
    const size = o.size || 9.5;
    const lineH = o.lineHeight || size * 1.32;
    const indent = o.indent || 0;
    const maxW = o.maxWidth || (CONTENT_W - indent);

    const measured = segments.map(seg => {
      const style = seg.bold ? 'bold' : (seg.italics ? 'italic' : 'normal');
      const text = String(seg.text === null || seg.text === undefined ? '' : seg.text);
      doc.setFont(FONT, style);
      doc.setFontSize(size);
      return {
        text: text,
        style: style,
        color: seg.color || BODY,
        width: doc.getTextWidth(text)
      };
    });

    const total = measured.reduce((sum, seg) => sum + seg.width, 0);

    if (total <= maxW) {
      ensure(lineH + 3);

      if (o.bullet) {
        doc.setFillColor(BODY[0], BODY[1], BODY[2]);
        doc.circle(MARGIN + 2.5, y + size * 0.42, 1.2, 'F');
      }

      let x = MARGIN + indent;
      measured.forEach(seg => {
        setStyle(size, seg.style, seg.color);
        doc.text(seg.text, x, y + size);
        x += seg.width;
      });
      y += lineH + 3 + (o.after || 0);
      return;
    }

    measured.forEach((seg, index) => paragraph(seg.text, {
      size: size,
      style: seg.style,
      color: seg.color,
      indent: indent,
      lineHeight: lineH,
      after: 1,
      bullet: Boolean(o.bullet) && index === 0
    }));
  };

  // Uppercase section heading with the same rule line used in the preview.
  const heading = (title) => {
    ensure(30);
    setStyle(10.5, 'bold', INK);
    doc.text(String(title).toUpperCase(), MARGIN, y + 9);
    y += 13;

    doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
    doc.setLineWidth(0.75);
    doc.line(MARGIN, y, RIGHT, y);
    y += 8;
  };

  // Row of rounded "chips" that wrap onto as many lines as required.
  const chips = (items) => {
    const size = 8.5;
    const padX = 6;
    const padY = 3.5;
    const gap = 5;
    const h = size + padY * 2;
    let x = MARGIN;

    (items || []).forEach(label => {
      const text = String(label);
      doc.setFont(FONT, 'normal');
      doc.setFontSize(size);
      const w = doc.getTextWidth(text) + padX * 2;

      if (x + w > RIGHT) {
        x = MARGIN;
        y += h + gap;
      }
      if (ensure(h + 2)) x = MARGIN;

      doc.setFillColor(CHIP_BG[0], CHIP_BG[1], CHIP_BG[2]);
      doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
      doc.setLineWidth(0.5);
      doc.roundedRect(x, y, w, h, 2, 2, 'FD');

      setStyle(size, 'normal', BODY);
      doc.text(text, x + padX, y + h - padY - 1.2);
      x += w + gap;
    });

    y += h + 8;
  };

  // ---------- Header ----------
  doc.setProperties({
    title: 'John Riley - Resume',
    author: 'John Riley',
    subject: 'Principal Agile Coach & Professional Scrum Trainer'
  });

  setStyle(19, 'bold', INK);
  doc.text('John Riley', PAGE_W / 2, y + 19, { align: 'center' });
  y += 25;

  setStyle(11, 'bold', BLUE);
  doc.text('Principal Agile Coach & Professional Scrum Trainer (PST)', PAGE_W / 2, y + 11, { align: 'center' });
  y += 17;

  setStyle(8.5, 'normal', MUTED);
  doc.text('Columbus, OH  |  john@readysetagile.com  |  https://johnriley.dev', PAGE_W / 2, y + 8.5, { align: 'center' });
  y += 14;

  // Accent rule beneath the header (mirrors the preview's header border).
  doc.setDrawColor(BLUE[0], BLUE[1], BLUE[2]);
  doc.setLineWidth(1.6);
  doc.line(MARGIN, y, RIGHT, y);
  y += 16;

  // ---------- Professional Profile ----------
  heading('Professional Profile');
  paragraph(data.summary, { after: 6 });

  // ---------- Relevant Experience ----------
  heading('Relevant Experience');

  (data.experiences || []).forEach(exp => {
    const dateText = exp.startYear + ' - ' + (exp.endYear ? exp.endYear : 'Present');

    doc.setFont(FONT, 'normal');
    doc.setFontSize(8.5);
    const dateW = doc.getTextWidth(dateText);

    ensure(30);
    const titleTop = y;

    inline([
      { text: exp.position, bold: true, color: INK },
      { text: '   @ ' + exp.company, bold: true, color: BLUE }
    ], { size: 10, maxWidth: CONTENT_W - dateW - 10 });

    setStyle(8.5, 'normal', MUTED);
    doc.text(dateText, RIGHT, titleTop + 10, { align: 'right' });

    (exp.bullets || []).forEach(bullet => {
      paragraph(bullet, { indent: 12, bullet: true, after: 1 });
    });

    y += 6;
  });

  // ---------- Key Proficiencies ----------
  heading('Key Proficiencies');
  chips(data.proficiencies);

  // ---------- Key Certifications ----------
  heading('Key Certifications');
  chips((data.certifications || []).map(cert => cert.shortName || cert.name));

  // ---------- Selected Presentations ----------
  if (data.speaking && data.speaking.length) {
    heading('Selected Presentations');

    data.speaking.forEach(s => {
      inline([
        { text: s.title, bold: true, color: INK },
        { text: ' — ' + s.venue + ' (' + s.year + ')', italics: true, color: MUTED }
      ], { indent: 12, bullet: true, after: 2 });
    });
  }

  doc.save('John_Riley_Resume.pdf');

}

function closeModal() {
  document.getElementById('generatorModal').classList.add('hidden');
}

function downloadDOCX(data) {
  const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, TabStopType, TabStopPosition } = docx;

  // Key Certifications are always selected locally from the job description so
  // the Word export always matches the preview, even when master data is used.
  if (!data.certifications || !data.certifications.length) {
    const jdElement = document.getElementById('jdInput');
    data.certifications = selectKeyCertifications(jdElement ? jdElement.value : '', 5);
  }

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
          // Force explicit 8.5 x 11 inch dimensions (in twips: 1 in = 1440 twips)
          size: {
            width: 12240,  // 8.5 inches
            height: 15840  // 11.0 inches
          },
          margin: { top: 720, bottom: 720, left: 720, right: 720 } // 0.5 in margins
        }
      },
      children: [
        // Header Name
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 60 },
          children: [
            new TextRun({ text: "John Riley", bold: true, size: 32, font: "Arial", color: "111827" }),
          ]
        }),
        // Subtitle
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 60 },
          children: [
            new TextRun({ text: "Principal Agile Coach & Professional Scrum Trainer (PST)", bold: true, color: "1D4ED8", size: 22, font: "Arial" }),
          ]
        }),
        // Contact Bar with Accent Line
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 240 },
          border: { bottom: { color: "1D4ED8", space: 8, style: BorderStyle.SINGLE, size: 18 } },
          children: [
            new TextRun({ text: "Columbus, OH | john@readysetagile.com | https://johnriley.dev", size: 18, color: "4B5563", font: "Arial" }),
          ]
        }),

        // Professional Profile Section
        new Paragraph({
          spacing: { before: 200, after: 120 },
          border: { bottom: { color: "D1D5DB", space: 4, style: BorderStyle.SINGLE, size: 8 } },
          children: [
            new TextRun({ text: "PROFESSIONAL PROFILE", bold: true, font: "Arial", size: 20, color: "111827" })
          ]
        }),
        new Paragraph({
          spacing: { after: 240, line: 280 },
          children: [
            new TextRun({ text: data.summary, font: "Arial", size: 20 })
          ]
        }),

        // Relevant Experience Section
        new Paragraph({
          spacing: { before: 200, after: 140 },
          border: { bottom: { color: "D1D5DB", space: 4, style: BorderStyle.SINGLE, size: 8 } },
          children: [
            new TextRun({ text: "RELEVANT EXPERIENCE", bold: true, font: "Arial", size: 20, color: "111827" })
          ]
        }),
        ...data.experiences.flatMap(exp => [
          new Paragraph({
            spacing: { before: 160, after: 80 },
            // Set right-aligned tab stop exactly at page printable border (12240 - 720 - 720 = 10800 twips)
            tabStops: [{ type: TabStopType.RIGHT, position: 10800 }],
            children: [
              new TextRun({ text: exp.position, bold: true, font: "Arial", size: 20, color: "111827" }),
              new TextRun({ text: ` @ ${exp.company}`, bold: true, font: "Arial", color: "1D4ED8", size: 20 }),
              new TextRun({ text: `\t${exp.startYear} - ${exp.endYear || 'Present'}`, font: "Arial", color: "6B7280", size: 18 })
            ]
          }),
          ...exp.bullets.map(b => new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 40, after: 80, line: 270 },
            children: [
              new TextRun({ text: b, font: "Arial", size: 19 })
            ]
          }))
        ]),

        // Key Proficiencies Section
        new Paragraph({
          spacing: { before: 240, after: 120 },
          border: { bottom: { color: "D1D5DB", space: 4, style: BorderStyle.SINGLE, size: 8 } },
          children: [
            new TextRun({ text: "KEY PROFICIENCIES", bold: true, font: "Arial", size: 20, color: "111827" })
          ]
        }),
        new Paragraph({
          spacing: { after: 240, line: 300 },
          children: data.proficiencies.map(skill => new TextRun({
            text: `  ${skill}  `,
            shading: { fill: "F3F4F6" },
            font: "Arial",
            size: 18
          })).reduce((prev, curr) => [...prev, curr, new TextRun({ text: "  " })], [])
        }),

        // Key Certifications Section (always chosen locally from the JD)
        ...(data.certifications && data.certifications.length ? [
          new Paragraph({
            spacing: { before: 240, after: 120 },
            border: { bottom: { color: "D1D5DB", space: 4, style: BorderStyle.SINGLE, size: 8 } },
            children: [
              new TextRun({ text: "KEY CERTIFICATIONS", bold: true, font: "Arial", size: 20, color: "111827" })
            ]
          }),
          new Paragraph({
            spacing: { after: 240, line: 300 },
            children: data.certifications.map(cert => new TextRun({
              text: `  ${cert.shortName || cert.name}  `,
              shading: { fill: "F3F4F6" },
              font: "Arial",
              size: 18
            })).reduce((prev, curr) => [...prev, curr, new TextRun({ text: "  " })], [])
          })
        ] : []),

        // Selected Presentations Section
        ...(data.speaking && data.speaking.length > 0 ? [
          new Paragraph({
            spacing: { before: 240, after: 120 },
            border: { bottom: { color: "D1D5DB", space: 4, style: BorderStyle.SINGLE, size: 8 } },
            children: [
              new TextRun({ text: "SELECTED PRESENTATIONS", bold: true, font: "Arial", size: 20, color: "111827" })
            ]
          }),
          ...data.speaking.map(s => new Paragraph({
            bullet: { level: 0 },
            spacing: { before: 40, after: 80, line: 260 },
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