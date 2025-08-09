export interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  href?: string;
  stars?: number;
}

export const projects: ProjectItem[] = [
  {
    title: 'TuneVibe Platform',
    description: 'End‑to‑end audio / podcast platform (web, backend, smart contracts, IPFS). Consolidates TuneVibe FE, BE, contract, IPFS repos delivering streaming, decentralized storage and token logic.',
    tech: ['Next.js','NestJS','Node.js','TypeScript','IPFS','Hardhat','Solidity','PostgreSQL','Redis','Docker','K8s'],
    href: 'https://tunevibe-fe.vercel.app'
  },
  {
    title: 'hdrajs',
    description: 'Lightweight TypeScript helper library (WIP) providing reusable utilities and abstractions; published on NPM.',
    tech: ['TypeScript','NPM'],
    href: 'https://www.npmjs.com/package/hdrajs'
  },
  {
    title: 'viet-qr',
    description: 'NPM package generating Vietnam bank QR codes for payments; lightweight utility adopted in small internal tools.',
    tech: ['JavaScript','NPM','QR'],
    href: 'https://www.npmjs.com/package/@hoanle396/viet-qr',
    stars: 2
  },
  {
    title: 'Turbo Nest + Next Template',
    description: 'Monorepo starter template integrating NestJS backend and Next.js frontend with shared TypeScript types and turbo build pipeline.',
    tech: ['TurboRepo','NestJS','Next.js','TypeScript'],
    href: 'https://github.com/Hoanle396/turbo-nest-next-template'
  },
  {
    title: 'Sushifarm Backend',
    description: 'Yield farming / staking backend and smart contract maintenance within SushiSwap ecosystem adaptation.',
    tech: ['Go','Gin','Solidity','AWS','Docker'],
    href: 'https://github.com/Hoanle396'
  },
  {
    title: 'Built on Gno Portal',
    description: 'Gnoland ecosystem portal aggregating news, learning resources, NFT & media content with Express API + Next.js frontend.',
    tech: ['Next.js','Express','Docker','GitHub Actions'],
    href: 'https://github.com/Hoanle396'
  }
];
