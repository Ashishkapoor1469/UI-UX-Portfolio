export const selectedWork = [
  {
    id: "nestgo",
    eyebrow: "Open Source • Go Framework",
    title: "NestGo",
    oneLiner: "Modular Go backend framework inspired by NestJS, with compile-time DI and a powerful CLI.",
    role: "Creator & Architect",
    year: "2026",
    image: "/projects/nestgo.webp",
    problem:
      "Go's ecosystem is dominated by bare HTTP routers where developers must manually invent folder structures, dependency wiring, and boilerplate CRUD for every service.",
    approach:
      "Architected an opinionated, modular framework inspired by NestJS — implementing compile-time dependency injection without runtime reflection, an integrated Chi router, and a code-generating CLI.",
    decisions: [
      "Compile-time DI container with zero reflection for full type safety and zero runtime penalty",
      "CLI scaffolding engine (Cobra + Lipgloss) generating complete CRUD resources, DTOs, migrations, and tests",
      "Optimized HTTP request pipeline achieving 718.7 ns/op and 5 allocs/op in v0.6.0 benchmarks",
      "Built-in runtime diagnostics including route explorer, module dependency graph, and architecture linter",
    ],
    outcome:
      "A production-ready Go framework giving teams structure, tooling, and conventions out of the box with native Go speed.",
    techStack: ["Go", "Chi Router", "Cobra", "Lipgloss", "Redis", "gRPC", "Prometheus"],
    liveLink: "https://nestgo.vercel.app",
    githubLink: "https://github.com/Ashishkapoor1469/Nestgo",
  },
  {
    id: "forge-cli",
    eyebrow: "CLI • AI Multi-Agent System",
    title: "FORGE CLI",
    oneLiner: "Terminal-native AI coding assistant orchestrating multi-agent software engineering workflows.",
    role: "Creator & Architect",
    year: "2026",
    image: "/projects/forge-cli.webp",
    problem:
      "Standard AI coding assistants operate as black boxes that struggle with multi-file coherence, generate circular dependencies, and lack surgical code diff review before mutating local files.",
    approach:
      "Built an event-driven terminal operating system where specialized agents (Planner, Validator, Task Manager, Worker, Reviewer, Editor) coordinate over an asynchronous event bus to plan and generate code safely.",
    decisions: [
      "Event-driven AgentBus (Node.js EventEmitter) coordinating non-blocking sub-agent messaging and wave execution",
      "Dynamic multi-model routing balancing cloud models for high-reasoning planning with local Ollama for fast generation",
      "Surgical line-by-line diff engine previewing unified patches before applying workspace edits",
      "Automated Reviewer-Editor self-correction loop executing up to two audit passes to verify syntax and imports",
    ],
    outcome:
      "A terminal-native engineering assistant that turns complex natural-language prompts into validated, conflict-free multi-file codebases.",
    techStack: ["TypeScript", "Node.js", "Commander", "@clack/prompts", "Ollama", "OpenRouter"],
    liveLink: null,
    githubLink: "https://github.com/Ashishkapoor1469/FORGECLI",
  },
  {
    id: "earlyecho",
    eyebrow: "Safety Intelligence • AI Surveillance",
    title: "EarlyEcho",
    oneLiner: "Continuous defect surveillance platform predicting product safety hazards weeks before official recalls.",
    role: "Software Engineer",
    year: "2026",
    image: "/projects/recallradar.webp",
    problem:
      "Consumer product safety hazards are typically buried in unstructured customer reviews and warranty logs, leaving manufacturers unaware of critical defects until official regulatory recalls are mandated.",
    approach:
      "Built an asynchronous surveillance engine that ingests marketplace reviews and CPSC filings, calculates Bayesian defect risk scores, indexes semantic embeddings in pgvector, and dispatches automated alerts.",
    decisions: [
      "Hybrid semantic search combining 384-dimensional SentenceTransformer embeddings with PostgreSQL pgvector IVFFlat indexing",
      "Grounded RAG intelligence (Ask EarlyEcho) via NVIDIA NIM strictly enforcing review-ID citations ([R-101]) to eliminate hallucinations",
      "Defect spike detector tracking defect velocity against historical baselines with a 3-mention noise filter guard",
      "Zero-flicker live sync via custom useLiveData hook polling /api/v1/system/changes every 4.5 seconds to preserve UI filter states",
    ],
    outcome:
      "A live safety intelligence dashboard that identifies emerging product hazards weeks ahead of official recalls, backed by a Backtest validation lab.",
    techStack: ["Python", "FastAPI", "Next.js", "PostgreSQL", "pgvector", "SQLAlchemy", "NVIDIA NIM", "Redis"],
    liveLink: "https://earlyecho.vercel.app",
    githubLink: "https://github.com/Ashishkapoor1469/RECALLRADAR",
  },
  {
    id: "eduguard",
    eyebrow: "Academic Management • Early Warning System",
    title: "EduGuard",
    oneLiner: "AI-assisted student risk management and mentorship platform with transparent deterministic scoring.",
    role: "Software Engineer",
    year: "2026",
    image: "/projects/eduguard.webp",
    problem:
      "Educational institutions track attendance, test marks, and mentor notes across disconnected spreadsheets and registers, discovering at-risk students only after semester exam failures.",
    approach:
      "Engineered a multi-role institutional platform combining an ASP.NET Core API and MongoDB with a deterministic risk calculator, time-windowed attendance sessions, and LLM-assisted remediation plans.",
    decisions: [
      "Separation of concerns: 100% deterministic rule-based risk scoring for transparency, using NVIDIA NIM solely for advisory guidance",
      "Dual-session daily attendance tracking with Class Representative (CR) delegated permissions and GitHub-style profile heatmaps",
      "Real-time student-mentor chat hub built on ASP.NET Core SignalR with fallback conversational AI support",
      "Durable MongoDB background worker pipeline managing asynchronous report-card generation and FCM push notifications",
    ],
    outcome:
      "An end-to-end institutional platform deployed on Vercel and Render enabling early academic difficulty detection across 4 user tiers.",
    techStack: ["ASP.NET Core", "C#", "React", "TypeScript", "MongoDB", "SignalR", "Docker", "Tailwind CSS"],
    liveLink: "https://edugard-ai-powerd.vercel.app",
    githubLink: "https://github.com/Ashishkapoor1469/Edugard-AiPowerd",
  },
  {
    id: "zitter",
    eyebrow: "Product • Full-stack Social App",
    title: "Zitter",
    oneLiner: "Full-stack social app, live at minitwitter-psi.vercel.app.",
    role: "Software Engineer",
    year: "2025",
    image: "/assets/z.svg",
    problem:
      "Build a scalable social platform with a fast feed, solid auth, and product-grade features—without it turning into a spaghetti codebase.",
    approach:
      "Designed clear domain flows (auth, posting, engagement), prioritized predictable APIs, and optimized the UI for 'instant' feedback with infinite scrolling.",
    decisions: [
      "JWT auth + email verification",
      "Infinite scroll feed tuned for performance",
      "Cloudinary uploads for media handling",
      "Redis-based rate limiting and scale-ready setup",
    ],
    outcome:
      "A production-grade full-stack build that feels fast and modern, with infrastructure choices that support growth.",
    techStack: ["Next.js", "React", "Node.js", "Express", "MongoDB", "JWT"],
    liveLink: "https://minitwitter-psi.vercel.app",
    githubLink: "https://github.com/Ashishkapoor1469/Fullstackapplication",
  },
  {
    id: "mp-ai-assistant",
    eyebrow: "Fork / Open Source Contribution • AI Assistant",
    title: "Multi-Platform AI Assistant",
    oneLiner: "Multi-provider AI assistant interface supporting streaming responses (Fork / Contribution).",
    role: "Fork / Open Source Contribution",
    year: "2025",
    image: "/assets/3.webp",
    problem:
      "Switching providers and models is friction. I wanted one UI that can talk to multiple AI systems without rewriting the app every time APIs change.",
    approach:
      "Designed a provider-agnostic architecture with a consistent UX for model switching, streaming responses, and conversation history.",
    decisions: [
      "Provider abstraction layer (OpenAI/Anthropic/Gemini style integrations)",
      "Streaming-first UX to keep interactions feeling instant",
      "Conversation history built as a product feature, not a debug log",
    ],
    outcome:
      "A unified interface that makes multi-model workflows feel simple and consistent across environments.",
    techStack: ["Next.js", "TypeScript", "REST APIs", "Streaming"],
    liveLink: null,
    githubLink: "https://github.com/Ashishkapoor1469/multi-platform-ai-assistant",
  },
];
