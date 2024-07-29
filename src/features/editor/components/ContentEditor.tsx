"use client";

import { MDXEditorMethods } from "@mdxeditor/editor";
import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";

import { TextEditor } from "@/layout/TextEditor";

type ContentEditorProps = {
  id: number;
  content: string | null;
  userId: string;
};

export const ContentEditor: React.FC<ContentEditorProps> = ({
  id,
  content,
  userId,
}) => {
  const ref = React.useRef<MDXEditorMethods>(null);
  const [markdown, setMarkdown] = useState(content || "");

  const handleSave = async () => {
    if (!content) {
      return;
    }

    try {
      await fetch(process.env.NEXT_PUBLIC_URL + "/api/content/" + id, {
        method: "PATCH",
        body: JSON.stringify({
          markdown,
          userId,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack gap={2}>
      <TextEditor ref={ref} markdown={markdown} onChange={setMarkdown} />

      <Box>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Stack>
  );
};
