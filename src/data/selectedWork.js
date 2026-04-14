export const selectedWork = [
  {
    id: "forge-cli",
    eyebrow: "CLI • AI systems",
    title: "FORGE",
    role: "Builder / architect",
    year: "2025–2026",
    image: "/assets/1.webp",
    problem:
      "Most “AI coding tools” are either too rigid or too magical. I wanted a terminal-native system that decomposes real requests into executable work—while staying inspectable.",
    approach:
      "Built an agent pipeline (plan → schedule → execute), optimized for fast iteration and real file generation in a local workspace with streaming output.",
    decisions: [
      "Multi-agent workflow (Planner → Task Manager → Worker)",
      "Parallel “execution waves” for speed without chaos",
      "Dual provider support (local Ollama + OpenRouter cloud)",
      "Persistent memory across sessions for continuity",
    ],
    outcome:
      "A production-style CLI that turns prompts into concrete changes—structured, debuggable, and designed for daily use.",
    techStack: ["Node.js", "TypeScript", "Ollama", "OpenRouter", "CLI UX"],
    liveLink: null,
    githubLink: "https://github.com/Ashishkapoor1469/FORGECLI",
  },
  {
    id: "zitter",
    eyebrow: "Product • Full‑stack",
    title: "Zitter",
    role: "Full‑stack developer",
    year: "2025",
    image: "/assets/z.svg",
    problem:
      "Build a scalable social platform with a fast feed, solid auth, and product-grade features—without it turning into a spaghetti codebase.",
    approach:
      "Designed clear domain flows (auth, posting, engagement), prioritized predictable APIs, and optimized the UI for “instant” feedback with infinite scrolling.",
    decisions: [
      "JWT auth + email verification",
      "Infinite scroll feed tuned for performance",
      "Cloudinary uploads for media handling",
      "Redis-based rate limiting and scale-ready setup",
    ],
    outcome:
      "A production-grade full-stack build that feels fast and modern, with infrastructure choices that support growth.",
    techStack: ["Next.js", "React", "Node.js", "Express", "MongoDB", "JWT"],
    liveLink: "https://minitwitter-psi.vercel.app/",
    githubLink: "https://github.com/Ashishkapoor1469/Fullstackapplication",
  },
  {
    id: "mp-ai-assistant",
    eyebrow: "AI • Multi-provider",
    title: "Multi‑Platform AI Assistant",
    role: "Product engineer",
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
  {
    id: "codeaxe",
    eyebrow: "Learning • Frontend",
    title: "CODEAXE",
    role: "Frontend & logic",
    year: "2024",
    image: "/assets/code.png",
    problem:
      "Turn practice into progress—help users focus on problem solving without UI friction.",
    approach:
      "Built a crisp content structure, kept interactions predictable, and tuned layout + typography so the experience stays readable at speed.",
    decisions: [
      "Information hierarchy that keeps context visible while solving",
      "Motion used as feedback (not decoration)",
      "Reusable components for questions, filters, and content blocks",
    ],
    outcome:
      "A fast, structured learning interface that feels intentional—like a product, not a project page.",
    techStack: ["React", "JavaScript", "Tailwind CSS"],
    liveLink: "https://codeaxe.vercel.app/",
    githubLink: "https://github.com/Ashishkapoor1469/CODEAXE",
  },
];

