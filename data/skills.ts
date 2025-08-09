export interface SkillGroup {
  category: string;
  skills: string[];
}
export const skills: SkillGroup[] = [
  { category: 'Languages', skills: ['TypeScript', 'JavaScript', 'Python', 'Go', 'SQL'] },
  { category: 'Backend', skills: ['Node.js', 'NestJs', 'tRPC', 'Typeorm', 'REST', 'GraphQL'] },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion', 'Redux', 'Zustand'],
  },
  { category: 'DevOps', skills: ['Docker', 'Gitlab CI', 'K8S', 'AWS', 'CI/CD'] },
  { category: 'Databases', skills: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB'] },
  { category: 'Testing', skills: ['Jest'] },
];
