import React from "react";
import { Stack, Typography } from "@mui/material";

import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { Project } from "@/features/projects/types/Project";

const ProjectsPage: React.FC = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/projects");
  const projects = (await res.json()) as Project[];

  return (
    <section>
      <Typography variant="h1">Projects</Typography>

      <Stack direction="row" gap={2}>
        {projects?.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </Stack>
    </section>
  );
};

export default ProjectsPage;
