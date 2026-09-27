// ==========================================
// Local Certification Knowledge Base
// ==========================================
// Every certification John Riley holds, paired with the skills, synonyms and
// Scrum.org learning objectives required to decide - entirely LOCALLY - which
// five are most relevant to a given job description.
//
// There is no AI and no network access involved. The scoring engine in
// resume-generator.js (selectKeyCertifications) reads this catalog and matches
// it against the keywords extracted from the job description.
//
// NOTE: this global is intentionally named `certificationCatalog` and NOT
// `certifications`, because hero-section.js already owns a global
// `certifications` array for the on-screen badge list.
//
// Objective text below is derived from the official Scrum.org course
// overviews and learning objectives.
// ==========================================

var certificationCatalog = [
  {
    id: "PST",
    name: "Professional Scrum Trainer",
    shortName: "Professional Scrum Trainer (PST)",
    provider: "Scrum.org",
    badge: "img/PST.svg",
    category: "Training & Coaching",
    weight: 10,
    synopsis: "The Scrum.org Professional Scrum Trainer credential. PSTs are vetted Scrum experts licensed to deliver official Scrum.org courseware, including Applying Professional Scrum, using consistent activity-based materials worldwide.",
    keyLearnings: [
      "Recognised as an expert in Scrum",
      "Deliver official Scrum.org Professional Scrum courseware",
      "Teach the Applying Professional Scrum course",
      "Design activity-based learning for teams and organisations",
      "Validated through interviews, knowledge validation, training and peer review"
    ],
    skills: ["Professional Scrum Training", "Courseware Delivery", "Expert Scrum Knowledge", "Public Speaking"],
    tags: ["trainer", "pst", "training", "teach", "teaching", "instructional design", "courseware", "instructor", "coaching", "agile coach", "mentor", "facilitator", "enablement", "workshop", "upskilling", "curriculum"]
  },
  {
    id: "PAL-EBM",
    name: "Professional Agile Leadership - Evidence-Based Management",
    shortName: "Professional Agile Leadership - EBM (PAL-EBM)",
    provider: "Scrum.org",
    badge: "img/PAL-EBM.svg",
    category: "Leadership & Measurement",
    weight: 9,
    synopsis: "Scrum.org certification for leaders on applying Evidence-Based Management: using empiricism to set and steer strategic goals, and the four Key Value Areas as lenses for evidence-based decisions.",
    keyLearnings: [
      "Understand the essential aspects of goals and measures and how they influence behaviours, culture and values",
      "Help organisations embrace empiricism as a leadership approach, steering incrementally with experiments",
      "Appreciate how goals and trust act together to enable autonomy, transparency and value delivery",
      "Correlate market leadership and sustainability to curiosity, adaptation and empiricism",
      "Use EBM and its four Key Value Areas (Unrealized Value, Current Value, Time to Market, Ability to Innovate) to improve market value and operational capability"
    ],
    skills: ["Evidence-Based Management", "Key Value Areas", "Empirical Goal Setting", "Value Metrics"],
    tags: ["ebm", "evidence based management", "evidence-based management", "evidence", "metrics", "measurement", "kpi", "okr", "outcomes", "business value", "roi", "leadership", "strategy", "empiricism", "time to market", "ability to innovate", "decision making", "forecasting"]
  },
  {
    id: "PAL-I",
    name: "Professional Agile Leadership I",
    shortName: "Professional Agile Leadership I (PAL I)",
    provider: "Scrum.org",
    badge: "img/PAL-I.svg",
    category: "Leadership & Measurement",
    weight: 8,
    synopsis: "Scrum.org certification for senior leaders and middle managers who create the conditions for agile teams to succeed: leading cultural and behavioural change, removing impediments and fostering self-management.",
    keyLearnings: [
      "Understand how agility can help improve organisational performance",
      "Learn the challenges teams face during an Agile transformation and how to remove impediments",
      "Discover the shift in management style required when moving from traditional to agile ways of working",
      "Understand the leader role in supporting self-managing teams",
      "Learn how to assess and foster a team's agile maturity",
      "Connect personal, team and Scrum values with clear goals to develop high performing teams",
      "Identify how to measure the benefits and impacts of agility in an organisation"
    ],
    skills: ["Agile Leadership", "Cultural Change", "Team Maturity Assessment", "Self-Management"],
    tags: ["leadership", "leader", "manager", "management", "agile transformation", "digital transformation", "culture", "cultural change", "change management", "self-managing", "self management", "executive", "stakeholder", "organisational change", "organizational change", "middle management", "coaching"]
  },
  {
    id: "PSPO",
    name: "Professional Scrum Product Owner III",
    shortName: "Professional Scrum Product Owner III (PSPO III)",
    provider: "Scrum.org",
    badge: "img/PSPO-III.svg",
    category: "Product Ownership",
    weight: 9,
    synopsis: "The advanced Scrum.org Product Owner credential, covering product management performed with an agile mindset: bridging business strategy to product delivery and maximising the value of the product.",
    keyLearnings: [
      "Understand that Product Ownership includes Product Management performed with an Agile mindset",
      "Recognise the value of a product mindset over a project mindset",
      "Learn how to bridge business strategy to product development tactics",
      "Experience ways to align the team around business strategy, product vision, Product Goal and Sprint Goal",
      "Find ways to effectively communicate business strategy, product vision and Product Goal",
      "Discover techniques to collaborate with users, customers, stakeholders and the Scrum Team",
      "Identify metrics that track value creation and successful product delivery",
      "Learn how quality and the Definition of Done support long term product viability and reduce time to market",
      "Understand Scrum principles and empiricism",
      "Learn techniques for Product Backlog Management, Release Management and Forecasting"
    ],
    skills: ["Product Ownership", "Product Vision", "Value Maximisation", "Product Backlog Management"],
    tags: ["product owner", "product ownership", "product management", "product manager", "backlog", "product backlog", "roadmap", "product vision", "stakeholder", "stakeholder management", "value", "release management", "forecasting", "user stories", "prioritisation", "prioritization", "requirements", "business strategy", "go to market", "customer"]
  },
  {
    id: "SPS",
    name: "Scaled Professional Scrum",
    shortName: "Scaled Professional Scrum (SPS)",
    provider: "Scrum.org",
    badge: "img/SPS.svg",
    category: "Scaling",
    weight: 8,
    synopsis: "Scrum.org certification built on the Nexus framework. Students work together in a Nexus to organise and simulate a scaled product development project and overcome cross-team dependency challenges.",
    keyLearnings: [
      "Identify typical challenges in scaling, and learn principles and techniques for overcoming them",
      "Understand how to find the scale that works best, including when to reduce or de-scale",
      "Experience the negative impact of cross-team dependencies on value delivery at scale",
      "Learn how to identify, visualise, minimise and remove dependencies through cross-team refinement",
      "Learn how the Nexus framework extends and reinforces the key principles of Scrum to enable value delivery at scale",
      "Experience the Nexus framework in action, including its events, accountabilities and artifacts",
      "Experience techniques for organising teams, organising the work and running a Nexus",
      "Learn how to deliver value across the whole Nexus instead of optimising the work of individual teams"
    ],
    skills: ["Scaling Scrum", "Nexus Framework", "Dependency Management", "Cross-Team Refinement"],
    tags: ["scaling", "scaled", "scale", "nexus", "scaled agile", "safe", "dependencies", "dependency management", "cross-team", "cross team", "multiple teams", "program management", "portfolio", "enterprise", "coordination", "release train", "agile at scale", "programme"]
  },
  {
    id: "PPDV",
    name: "Professional Product Discovery & Validation",
    shortName: "Professional Product Discovery & Validation",
    provider: "Scrum.org",
    badge: "img/PPDV.svg",
    category: "Product Ownership",
    weight: 7,
    synopsis: "Scrum.org certification on incorporating discovery and validation into product development. Students apply techniques through a case study to reach an end-to-end, evidence-based approach to product development.",
    keyLearnings: [
      "Increase user value created by deliberately designing experiments to validate assumptions about users needs and wants",
      "Reduce waste and improve ROI by consciously only investing based on evidence gathered from validation",
      "Improve organisational collaboration and alignment by engaging key stakeholders using data instead of opinions",
      "Unlock creativity by reframing work as problems to solve rather than tasks to execute"
    ],
    skills: ["Product Discovery", "Experiment Design", "Hypothesis Validation", "Evidence-Based Decisions"],
    tags: ["discovery", "validation", "experiment", "experimentation", "hypothesis", "assumptions", "customer research", "user research", "user centered", "user-centred", "user centered design", "ux", "usability", "a/b testing", "evidence", "product owner", "product manager", "personas", "jobs to be done", "value proposition", "market research"]
  },
  {
    id: "PSD-I",
    name: "Professional Scrum Developer I",
    shortName: "Professional Scrum Developer I (PSD I)",
    provider: "Scrum.org",
    badge: "img/PSD-I.svg",
    category: "Engineering & DevOps",
    weight: 8,
    synopsis: "Scrum.org certification on building releasable increments of software with Scrum. Students collaborate over a series of Sprints applying modern agile engineering practices and supportive DevOps tooling.",
    keyLearnings: [
      "Experience real collaboration between Developers, Product Owner and Scrum Master while building a high quality and valuable product",
      "Build and deliver working software by applying modern Agile engineering practices and supportive DevOps tools",
      "Understand the synergy between the elements of Scrum and complementary engineering practices",
      "Apply test driven development, pair programming, agile testing and other practices to ensure quality",
      "Manage code quality and technical debt, and apply agile architecture practices",
      "Use the Definition of Done and backlog management practices such as slicing features"
    ],
    skills: ["Test-Driven Development", "Definition of Done", "Agile Architecture", "DevOps with Scrum"],
    tags: ["developer", "development", "software development", "software engineer", "engineering", "tdd", "test driven development", "test-driven", "test driven", "test-driven development", "pair programming", "technical debt", "code quality", "clean code", "refactoring", "devops", "ci/cd", "ci cd", "continuous integration", "continuous delivery", "continuous deployment", "build pipeline", "automated testing", "automation", "unit testing", "integration testing", "architecture", "definition of done", "coding", "programming", "cloud", "docker", "kubernetes", "api", "backend", "deployment"]
  },
  {
    id: "PSK-I",
    name: "Professional Scrum with Kanban I",
    shortName: "Professional Scrum with Kanban I (PSK I)",
    provider: "Scrum.org",
    badge: "img/PSK-I.svg",
    category: "Flow & Kanban",
    weight: 7,
    synopsis: "Scrum.org certification on optimising the flow of work in Professional Scrum using Kanban practices: visualising workflow, limiting work in progress, actively managing work items and inspecting flow.",
    keyLearnings: [
      "Understand flow and Kanban practices from the perspective of the Scrum Team",
      "Explain how Kanban practices can be used to improve flow within a Sprint",
      "Increase transparency by helping the Scrum Team visualise their workflow",
      "Use data to create a Service Level Expectation (SLE) for improving delivery predictability",
      "Apply the concept of flow and Kanban practices during Scrum Events",
      "Assist the team in overcoming common flow challenges by actively managing work in progress"
    ],
    skills: ["Flow Metrics", "Cycle Time", "WIP Limits", "Service Level Expectation"],
    tags: ["kanban", "flow", "flow metrics", "wip", "work in progress", "work in progress limit", "cycle time", "throughput", "lead time", "service level expectation", "sle", "predictability", "value stream", "queue", "bottleneck", "cumulative flow", "workflow", "continuous improvement", "scrum master", "agile coach", "sustainable pace", "kanban board"]
  },
  {
    id: "PSM",
    name: "Professional Scrum Master",
    shortName: "Professional Scrum Master (PSM I & II)",
    provider: "Scrum.org",
    badge: "img/PSM-II.svg",
    category: "Scrum Mastery",
    weight: 9,
    synopsis: "The Scrum.org Professional Scrum Master credentials (PSM I and PSM II). Validated, deep knowledge of Scrum theory and empiricism, the Scrum Master stances, and how to help teams and organisations deliver value.",
    keyLearnings: [
      "Understand the theory and principles behind Scrum and empiricism",
      "Understand how each part of the Scrum framework ties back to the principles and theory",
      "Understand uncertainty and complexity in product delivery",
      "Understand the meaning and importance of the Scrum values",
      "Learn what Done means and why it is crucial to transparency",
      "Know how to use the Product Backlog to plan with agility",
      "Understand the importance of self-managing teams, the interpersonal skills needed, and the Scrum Master accountability",
      "Clarify the leadership role a Scrum Master plays on the team",
      "Apply the Scrum Master stances: teacher, coach and mentor, facilitator, and change agent",
      "Deal with team conflict, remove impediments and support Developers and Product Owners to be more effective"
    ],
    skills: ["Scrum Framework", "Empiricism", "Scrum Master Stances", "Team Facilitation"],
    tags: ["scrum master", "scrum", "agile", "agile coach", "agile coaching", "coaching", "empiricism", "scrum framework", "scrum guide", "facilitation", "servant leadership", "change agent", "impediments", "impediment removal", "self-managing", "self management", "team", "sprint", "retrospective", "agile practices", "agile transformation", "mentoring", "team development", "conflict resolution", "scrum team", "agile delivery", "backlog refinement"]
  },
  {
    id: "PSM-AIE",
    name: "Professional Scrum Master - AI Essentials",
    shortName: "Professional Scrum Master - AI Essentials",
    provider: "Scrum.org",
    badge: "img/PSM-AIE.svg",
    category: "AI & Emerging Tech",
    weight: 8,
    synopsis: "Scrum.org certification on how Scrum Masters use AI to improve their own capability, enable their Scrum Teams to apply AI effectively, and adopt AI responsibly and securely across the organisation.",
    keyLearnings: [
      "Explain key AI concepts, including machine learning, deep learning, generative AI and agentic AI",
      "Describe how AI supports effective Scrum Team facilitation and collaboration",
      "Discuss how AI tools can enhance the Scrum Master accountability through real-world use cases",
      "Demonstrate practical uses of generative AI tools to support the Scrum Team and Scrum events",
      "Demonstrate effective AI prompt engineering to get the desired results",
      "Integrate AI tools into day-to-day work",
      "Implement AI-informed behaviours in day-to-day work",
      "Apply ethical and responsible practices when adopting and working with AI"
    ],
    skills: ["AI-Enabled Facilitation", "Generative AI", "Prompt Engineering", "Responsible AI Adoption"],
    tags: ["ai", "artificial intelligence", "generative ai", "genai", "llm", "large language model", "machine learning", "deep learning", "agentic ai", "prompt engineering", "prompt", "chatgpt", "copilot", "ai tools", "ai adoption", "ai enablement", "responsible ai", "ai ethics", "ai governance", "automation", "scrum master", "coaching", "facilitation", "innovation"]
  },
  {
    id: "PSPO-AIE",
    name: "Professional Scrum Product Owner - AI Essentials",
    shortName: "Professional Scrum Product Owner - AI Essentials",
    provider: "Scrum.org",
    badge: "img/PSPO-AI-Essentials-Cert-Badge.svg",
    category: "AI & Emerging Tech",
    weight: 8,
    synopsis: "Scrum.org certification on using AI tools across each Product Owner stance, including a security and ethics stance for adopting AI responsibly and securely within an organisation.",
    keyLearnings: [
      "Describe AI and how it supports modern product development",
      "Explain key concepts in AI, including machine learning, deep learning, generative AI and agentic AI",
      "Discuss how AI tools can enhance Product Ownership through real-world use cases",
      "Demonstrate the use of generative AI tools to support product work",
      "Move from theory to practice by embedding AI tools into daily Product Ownership",
      "Identify ethical and responsible practices when adopting AI tools",
      "Implement AI-informed behaviours as an AI-literate Product Owner"
    ],
    skills: ["AI for Product Ownership", "Generative AI", "Prompt Engineering", "Responsible AI"],
    tags: ["ai", "artificial intelligence", "generative ai", "genai", "llm", "large language model", "machine learning", "deep learning", "agentic ai", "prompt engineering", "prompt", "chatgpt", "ai product", "ai roadmap", "ai strategy", "ai adoption", "responsible ai", "ai ethics", "ai security", "product owner", "product management", "product manager", "innovation", "data informed"]
  }
];
