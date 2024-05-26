export default interface ProjectType {
  isEmpty?: boolean;
  projectId: string;
  projectThumbnail: string;
  projectName: string;
  projectDate?: number;
  projectDescription: string;
  projectParticipate?: string[];
  projectTechStacks: string[];
}

export interface ProjectDetail {
  id: string;
  authorId: string;
  thumbnail?: string;
  name?: string;
  intro?: string;
  createdAt?: number;
  description?: string;
  participants?: string[];
  techStack?: string[];
}
