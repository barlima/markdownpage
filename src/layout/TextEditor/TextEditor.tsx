"use client";

import { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";
import { Paper } from "@mui/material";
import dynamic from "next/dynamic";
import { forwardRef } from "react";

const InitializedTextEditor = dynamic(() => import("./InitializedTextEditor"), {
  ssr: false,
});

export const TextEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => (
    <Paper>
      <InitializedTextEditor editorRef={ref} {...props} />
    </Paper>
  )
);
