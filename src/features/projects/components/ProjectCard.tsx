import React from "react";
import { Paper, Typography } from "@mui/material";

import { Project } from "../types/Project";
import { SelectProjectButton } from "./SelectProjectButton";

type ProjectCardProps = {
  project: Project;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Paper variant="outlined" key={project.id}>
      <Typography variant="h4">{project.name}</Typography>

      <SelectProjectButton projectId={project.id} />
    </Paper>
  );
};
