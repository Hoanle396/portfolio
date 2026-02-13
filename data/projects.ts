export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  href?: string;
  stars?: number;
  featured?: boolean;
}

export const projects: ProjectItem[] = [
  {
    title: 'Nexus Code',
    description:
      'AI-powered code review SaaS with GPT-4 & Claude integration, team workspaces, Git webhooks, and USDC blockchain payments.',
    tech: ['Next.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'Solidity', 'ethers.js'],
    href: 'https://nexus-code.hoanle.app/',
    featured: true,
  },
  {
    title: 'TuneVibe Platform',
    description:
      'Full-stack audio/podcast platform with streaming, decentralized storage, token economy, and IPFS integration.',
    tech: ['Next.js', 'NestJS', 'Solidity', 'IPFS', 'PostgreSQL', 'K8s'],
    href: 'https://tunevibe-fe.vercel.app',
    featured: true,
  },
  {
    title: 'Discord AI Bot',
    description:
      'Intelligent Discord bot with AI-powered conversations and server management capabilities.',
    tech: ['TypeScript', 'Discord.js', 'AI APIs'],
    href: 'https://github.com/Hoanle396/Discord-AI',
  },
  {
    title: 'Go Logger',
    description:
      'Structured logging library for Go with leveled output, custom formatters, and zero-dependency design.',
    tech: ['Go'],
    href: 'https://github.com/Hoanle396/logger',
  },
  {
    title: 'hdrajs',
    description:
      'Lightweight TypeScript utility library with reusable helpers, published on NPM.',
    tech: ['TypeScript', 'NPM'],
    href: 'https://www.npmjs.com/package/hdrajs',
  },
  {
    title: 'viet-qr',
    description:
      'NPM package for generating Vietnam bank QR codes for instant payments.',
    tech: ['JavaScript', 'NPM', 'QR'],
    href: 'https://www.npmjs.com/package/@hoanle396/viet-qr',
    stars: 2,
  },
  {
    title: 'Turbo Nest + Next Template',
    description:
      'Monorepo starter with NestJS + Next.js, shared types, and turbo build pipeline.',
    tech: ['TurboRepo', 'NestJS', 'Next.js', 'TypeScript'],
    href: 'https://github.com/Hoanle396/turbo-nest-next-template',
  },
  {
    title: 'Sushifarm Backend',
    description:
      'Yield farming & staking backend with smart contract maintenance in the SushiSwap ecosystem.',
    tech: ['Go', 'Gin', 'Solidity', 'AWS', 'Docker'],
    href: 'https://github.com/Hoanle396',
  },
];
