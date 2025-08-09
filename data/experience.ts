export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: 'Rabid App',
    role: 'Developer & DevOps',
    period: 'May 2025 – Aug 2025',
    achievements: [
      'Designed relational database schema and implemented backend services with NestJS (Node.js)',
      'Implemented CI/CD pipelines using Kubernetes, GitLab CI & Argo CD for automated deployments',
      'Mentored & coordinated backend team (8 members) ensuring delivery cadence & code quality',
      'Diagnosed & resolved production issues improving reliability of podcast/social features'
    ]
  },
  {
    company: 'NFT Marketplace (Privacy‑Focused)',
    role: 'Full‑stack Developer',
    period: 'Nov 2024 – Mar 2025',
    achievements: [
      'Engineered privacy‑centric NFT trading platform integrating Data Ownership Protocol',
      'Developed smart contracts in Solidity (Hardhat) plus backend services (NestJS, Node.js)',
      'Built responsive web interface with React/Next.js enabling secure NFT discovery & trading',
      'Set up CI/CD with K8s, GitLab CI & Argo CD; mentored backend contributors',
      'Integrated AWS S3 for asset storage and optimized media delivery'
    ]
  },
  {
    company: 'Lotton (Telegram Mini App)',
    role: 'Backend Developer',
    period: 'Aug 2024 – Sep 2024',
    achievements: [
      'Developed lottery backend APIs with NestJS enabling fair draws on Ton Network',
      'Integrated Telegram Mini App authentication & feature endpoints',
      'Resolved performance & integration issues improving response reliability'
    ]
  },
  {
    company: 'Sushifarm (SushiSwap Ecosystem)',
    role: 'Backend Developer',
    period: 'Jul 2024 – Sep 2024',
    achievements: [
      'Maintained & enhanced Solidity smart contracts for staking / yield farming',
      'Developed backend services in Go (Gin) to support gameplay & reward logic',
      'Handled deployment processes on AWS EC2 and ensured uptime'
    ]
  },
  {
    company: 'Built on Gno (Gnoland Ecosystem Portal)',
    role: 'Full‑stack Developer',
    period: 'Jun 2024 – Jul 2024',
    achievements: [
      'Designed database schema & public REST API (Express.js) for ecosystem resources',
      'Implemented front‑end with Next.js consuming unified content feeds',
      'Set up CI via GitHub Actions & Dockerized services for consistent builds'
    ]
  }
];
