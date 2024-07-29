import React from "react";
import Link from "next/link";
import { Button, Paper, Stack, Typography } from "@mui/material";

import { getUserProjects } from "../../services/database/getUserProjects";

export const UserProjects: React.FC = async () => {
  const { projects } = await getUserProjects();

  return (
    <Stack direction="row" gap={2}>
      {projects.map((project) => (
        <Paper variant="outlined" key={project.id}>
          <Stack direction="row" gap={2}>
            <Typography variant="h4">{project.project.name}</Typography>

            <Button
              variant="contained"
              component={Link}
              href={`profile/projects/${project.id}`}
            >
              Edit
            </Button>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};
