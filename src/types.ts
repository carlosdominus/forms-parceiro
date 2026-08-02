export interface SlideData {
  id: string;
  title: string;
  subtitle?: string;
  number: number;
}

export interface ExpertProfile {
  name: string;
  handle: string;
  followers: string;
  instaImg: string;
  vslImg: string;
  niche: string;
  results?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  iconName: string;
}

export interface AnalysisPost {
  title: string;
  views: string;
  format: string;
  analysis: string;
}
