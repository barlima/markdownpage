import { Stack, Typography } from "@mui/material";
import React from "react";
import { ProjectContentListItem } from "./ProjectContentListItem";

type ProjectContentListProps = {
  keys: string[];
  userProjectId: number;
};

export const ProjectContentList: React.FC<ProjectContentListProps> = ({
  keys,
  userProjectId,
}) => {
  return (
    <Stack gap={2}>
      {keys.map((key) => (
        <ProjectContentListItem key={key} contentKey={key} userProjectId={userProjectId} />
      ))}
    </Stack>
  );
};
