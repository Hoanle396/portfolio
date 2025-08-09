export interface SkillGroup { category: string; skills: string[] }
export const skills: SkillGroup[] = [
  { category: 'Languages', skills: ['TypeScript','JavaScript','Python','Go','SQL'] },
  { category: 'Frontend', skills: ['React','Next.js','TailwindCSS','Framer Motion','Redux','Zustand'] },
  { category: 'Backend', skills: ['Node.js','Express','tRPC','Prisma','REST','GraphQL'] },
  { category: 'DevOps', skills: ['Docker','GitHub Actions','Vercel','AWS','CI/CD'] },
  { category: 'Databases', skills: ['PostgreSQL','MySQL','Redis','MongoDB'] },
  { category: 'Testing', skills: ['Jest','React Testing Library','Playwright'] }
];
