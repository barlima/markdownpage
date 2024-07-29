import { Project } from "@/features/projects/types/Project";

export type UserProject = {
  id: number;
  domain: string;
  project: Project;
};
