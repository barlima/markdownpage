import React from "react";

import { getUserProjectContent } from "../../services/database/getUserProjectContent";
import { ProjectContentEdit } from "./ProjectContentEdit";
import { Stack, Typography } from "@mui/material";

type ProjectContentListItemProps = {
  contentKey: string;
  userProjectId: number;
};

export const ProjectContentListItem: React.FC<
  ProjectContentListItemProps
> = async ({ contentKey, userProjectId }) => {
  const { projectContent } = await getUserProjectContent(
    contentKey,
    userProjectId
  );

  return (
    <Stack gap={2}>
      <Typography variant="h3">{contentKey} page:</Typography>
      <ProjectContentEdit projectContent={projectContent} />
    </Stack>
  );
};
