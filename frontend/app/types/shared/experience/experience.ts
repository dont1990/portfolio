export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  description: string;
}

export interface Certification {
  name: string;
  org: string;
  year: string;
}

export interface ExperienceData {
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
}
