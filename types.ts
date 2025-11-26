export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack?: string[];
  tags: string[];
  category: 'AI Product' | 'Tool' | 'Experiment';
}

export interface Venture {
  id: string;
  title: string;
  description: string;
  url: string;
}

export interface Article {
  id: string;
  title: string;
  platform: 'Medium' | 'LinkedIn';
  readTime: string;
  url: string;
}