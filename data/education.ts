export interface EducationItem {
  school: string;
  degree: string;
  period: string;
  details?: string[];
}

export const education: EducationItem[] = [
  {
    school: 'The University of Da Nang',
    degree: 'B.S. Software Engineering',
    period: '—',
    details: [
      'Coursework: Software Architecture, Distributed Systems, Database Systems, Algorithms'
    ]
  }
];
