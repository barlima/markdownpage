"use client";

import { MDXEditorMethods } from "@mdxeditor/editor";
import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";

import { TextEditor } from "@/layout/TextEditor";
import { ProjectContent } from "@/features/projects/types/ProjectContent";

type ProjectContentEditProps = {
  projectContent: ProjectContent | null;
};

export const ProjectContentEdit: React.FC<ProjectContentEditProps> = ({
  projectContent,
}) => {
  const { user } = useUser();
  const ref = React.useRef<MDXEditorMethods>(null);
  const [markdown, setMarkdown] = useState(projectContent?.markdown || "");

  const handleSave = async () => {
    if (!projectContent) {
      return;
    }

    try {
      await fetch(
        process.env.NEXT_PUBLIC_URL +
          "/api/project-content/" +
          projectContent.id,
        {
          method: "PATCH",
          body: JSON.stringify({
            markdown,
            user,
          }),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack gap={2}>
      <Box>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>

      {!projectContent && (
        <Typography variant="body1">
          Project content not yet generated
        </Typography>
      )}

      <TextEditor ref={ref} markdown={markdown} onChange={setMarkdown} />
    </Stack>
  );
};
