export const profile = {
  name: "Hoan Le",
  initials: "Hoan.",
  role: "Software Engineer & Blockchain Developer",
  location: "Vietnam",
  status: "Available for new opportunities",
  bio: "Full-stack developer building scalable web apps and blockchain products with modern tech stacks. I care about clean code, great UX, and shipping fast.",
  email: "hoan@hoanle.app",
  github: "https://github.com/hoanle396",
  resume: "/resume.pdf",
  stats: [
    { value: 3, suffix: "+", label: "Years experience" },
    { value: 20, suffix: "+", label: "Projects shipped" },
    { value: 15, suffix: "+", label: "Tech stacks" },
  ],
};

export const nav = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const expertise = [
  {
    num: "01",
    title: "Web Development",
    desc: "Full-stack apps with React, Next.js, NestJS & Go. Performant, accessible, production-ready.",
    tags: ["React", "Next.js", "NestJS", "Go"],
    accent: "#7c5cff",
  },
  {
    num: "02",
    title: "Blockchain / Web3",
    desc: "Smart contracts, DeFi protocols & NFT platforms. Gas-optimised, auditable Solidity code.",
    tags: ["Solidity", "Hardhat", "ethers.js", "DeFi"],
    accent: "#ff7a59",
  },
  {
    num: "03",
    title: "Backend Systems",
    desc: "Scalable REST & gRPC APIs, microservices, PostgreSQL, Redis, and message queues.",
    tags: ["Node.js", "PostgreSQL", "Redis", "gRPC"],
    accent: "#22d3ee",
  },
  {
    num: "04",
    title: "DevOps & Cloud",
    desc: "Kubernetes, Docker, CI/CD pipelines & AWS infrastructure. Zero-downtime deployments.",
    tags: ["Kubernetes", "Docker", "AWS", "CI/CD"],
    accent: "#34d399",
  },
];

export const featuredProjects = [
  {
    name: "Nexus Code",
    tagline: "AI-powered code review SaaS",
    desc: "GPT-4 & Claude integration, team workspaces, Git webhooks, and USDC blockchain payments.",
    tags: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Solidity"],
    href: "#",
    gradient: "from-violet-500 via-indigo-700 to-bg-0",
    glow: "rgba(124,92,255,0.55)",
  },
  {
    name: "TuneVibe Platform",
    tagline: "Audio / podcast platform",
    desc: "Streaming, decentralized storage, token economy, and IPFS integration.",
    tags: ["Next.js", "NestJS", "Solidity", "IPFS", "PostgreSQL", "K8s"],
    href: "#",
    gradient: "from-orange-500 via-fuchsia-700 to-bg-0",
    glow: "rgba(255,122,89,0.5)",
  },
];

export const standardProjects = [
  {
    name: "Discord AI Bot",
    desc: "Intelligent Discord bot with AI-powered conversations and server management capabilities.",
    tags: ["TypeScript", "Discord.js", "AI APIs"],
    color: "#5865F2",
  },
  {
    name: "Go Logger",
    desc: "Structured logging library for Go with leveled output, custom formatters, and zero-dependency design.",
    tags: ["Go"],
    color: "#00ADD8",
  },
  {
    name: "hdrajs",
    desc: "Lightweight TypeScript utility library with reusable helpers, published on NPM.",
    tags: ["TypeScript", "NPM"],
    color: "#CB3837",
  },
  {
    name: "viet-qr",
    desc: "NPM package for generating Vietnam bank QR codes for instant payments.",
    tags: ["JavaScript", "NPM", "QR"],
    color: "#DA291C",
  },
  {
    name: "Turbo Nest + Next Template",
    desc: "Monorepo starter with NestJS + Next.js, shared types, and turbo build pipeline.",
    tags: ["TurboRepo", "NestJS", "Next.js", "TypeScript"],
    color: "#E0234E",
  },
  {
    name: "Sushifarm Backend",
    desc: "Yield farming & staking backend with smart contract maintenance in the SushiSwap ecosystem.",
    tags: ["Go", "Gin", "Solidity", "AWS", "Docker"],
    color: "#FA52A0",
  },
];

export const experience = [
  {
    title: "Developer & DevOps",
    company: "Rabid App",
    dates: "May 2025 – Aug 2025",
    bullets: [
      "Designed relational database schema and implemented backend services with NestJS (Node.js)",
      "Implemented CI/CD pipelines using Kubernetes, GitLab CI & Argo CD for automated deployments",
      "Mentored & coordinated backend team (8 members) ensuring delivery cadence & code quality",
      "Diagnosed & resolved production issues improving reliability of podcast/social features",
    ],
    accent: "#7c5cff",
    current: true,
  },
  {
    title: "Full-stack Developer",
    company: "NFT Marketplace (Privacy-Focused)",
    dates: "Nov 2024 – Mar 2025",
    bullets: [
      "Engineered privacy-centric NFT trading platform integrating Data Ownership Protocol",
      "Developed smart contracts in Solidity (Hardhat) plus backend services (NestJS, Node.js)",
      "Built responsive web interface with React/Next.js enabling secure NFT discovery & trading",
      "Set up CI/CD with K8s, GitLab CI & Argo CD; mentored backend contributors",
      "Integrated AWS S3 for asset storage and optimized media delivery",
    ],
    accent: "#ff7a59",
  },
  {
    title: "Backend Developer",
    company: "Lotton (Telegram Mini App)",
    dates: "Aug 2024 – Sep 2024",
    bullets: [
      "Developed lottery backend APIs with NestJS enabling fair draws on Ton Network",
      "Integrated Telegram Mini App authentication & feature endpoints",
      "Resolved performance & integration issues improving response reliability",
    ],
    accent: "#22d3ee",
  },
  {
    title: "Backend Developer",
    company: "Sushifarm (SushiSwap Ecosystem)",
    dates: "Jul 2024 – Sep 2024",
    bullets: [
      "Maintained & enhanced Solidity smart contracts for staking / yield farming",
      "Developed backend services in Go (Gin) to support gameplay & reward logic",
      "Handled deployment processes on AWS EC2 and ensured uptime",
    ],
    accent: "#fa52a0",
  },
  {
    title: "Full-stack Developer",
    company: "Built on Gno (Gnoland Ecosystem Portal)",
    dates: "Jun 2024 – Jul 2024",
    bullets: [
      "Designed database schema & public REST API (Express.js) for ecosystem resources",
      "Implemented front-end with Next.js consuming unified content feeds",
      "Set up CI via GitHub Actions & Dockerized services for consistent builds",
    ],
    accent: "#34d399",
  },
];

export const skills = [
  {
    name: "Languages",
    color: "#7c5cff",
    items: ["TypeScript", "JavaScript", "Python", "Go", "SQL"],
  },
  {
    name: "Backend",
    color: "#22d3ee",
    items: ["Node.js", "NestJs", "tRPC", "Typeorm", "REST", "GraphQL"],
  },
  {
    name: "Frontend",
    color: "#ff7a59",
    items: ["React", "Next.js", "TailwindCSS", "Framer Motion", "Redux", "Zustand"],
  },
  {
    name: "DevOps",
    color: "#34d399",
    items: ["Docker", "Gitlab CI", "K8S", "AWS", "CI/CD"],
  },
  {
    name: "Databases",
    color: "#fa52a0",
    items: ["PostgreSQL", "MySQL", "Redis", "MongoDB"],
  },
  {
    name: "Testing",
    color: "#ffd166",
    items: ["Jest"],
  },
];

export const education = {
  degree: "B.S. Software Engineering",
  school: "The University of Da Nang",
  coursework: [
    "Software Architecture",
    "Distributed Systems",
    "Database Systems",
    "Algorithms",
  ],
};
