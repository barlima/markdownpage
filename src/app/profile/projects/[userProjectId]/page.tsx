import { Container, Stack, Typography } from "@mui/material";
import React from "react";

import { getUserProject } from "@/features/profile/services/database/getUserProject";
import { ProjectContentList } from "@/features/profile/components/ProjectContent/ProjectContentList";
import { UserProjectDomain } from "@/features/profile/components/UserProjectDomain";

type UserProjectPageProps = {
  params: {
    userProjectId: string;
  };
};

const UserProjectPage: React.FC<UserProjectPageProps> = async ({ params }) => {
  const { userProject } = await getUserProject(Number(params.userProjectId));

  if (!userProject) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h1">Project not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack gap={2}>
        <Typography variant="h1">Project Body</Typography>

        <UserProjectDomain
          domain={userProject.domain}
          projectDomain={userProject.project.domain}
          vercelProjectId={userProject.project.vercelId}
        />

        <ProjectContentList
          keys={userProject.project.keys}
          userProjectId={userProject.id}
        />
      </Stack>
    </Container>
  );
};

export default UserProjectPage;
