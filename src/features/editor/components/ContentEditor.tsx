"use client";

import { MDXEditorMethods } from "@mdxeditor/editor";
import React, { useState } from "react";
import { Box, Button, Snackbar, Stack, Typography } from "@mui/material";

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
  const [open, setOpen] = useState(false);
  const [markdown, setMarkdown] = useState(content || "");

  const handleClose = () => {
    setOpen(false);
  };

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

      setOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack gap={2}>
      <Typography variant="h4">Project Body</Typography>

      <TextEditor ref={ref} markdown={markdown} onChange={setMarkdown} />

      <Box>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message="Content saved successfully."
        color="success"
      />
    </Stack>
  );
};
