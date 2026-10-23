export type ProjectBadgeType = 'cart' | 'spark' | 'doc' | 'iot' | 'code' | 'brain';

export type Project = {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  highlights: string[];
  repoUrl: string;
  demoUrl?: string;
  image: string;
  tags: string[];
  category: 'Web' | 'AI' | 'IoT' | 'Systems';
  badgeType: ProjectBadgeType;
  featured: boolean;
  stars: number;
  language: string;
  status: 'Public Repository' | 'Case Study';
};

export type ExperienceItem = {
  id: string;
  period: string;
  role: string;
  organization?: string;
  description: string;
  type: 'education' | 'freelance' | 'research';
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  icon: 'web' | 'automation' | 'iot' | 'ai';
  deliverables: string[];
};

export type SkillItem = {
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'AI & Data' | 'Embedded & Tools';
  iconKey: string;
  featured: boolean;
};

export type ResearchItem = {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  details: string;
  status: 'Research interest' | 'In progress';
  icon: 'nilm' | 'agri' | 'vision' | 'wireless';
  featured: boolean;
};

export type PrincipleItem = {
  title: string;
  subtitle: string;
  description: string;
};
