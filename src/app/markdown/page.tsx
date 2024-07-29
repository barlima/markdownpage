import { redirect } from "next/navigation";
import React from "react";
import { Container, Stack, Typography } from "@mui/material";

import { getMarkdown } from "@/features/editor/services/database/getMarkdown";
import { createClient } from "@/services/database/server";
import { Domain } from "@/features/editor/components/Domain";
import { ContentEditor } from "@/features/editor/components/ContentEditor";

const UserProjectPage: React.FC = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  const { markdown } = await getMarkdown(data.user.id);

  if (!markdown) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h1">404! Not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack gap={2}>
        <Typography variant="h1">Project Body</Typography>

        <Domain domain={markdown.domain} />

        <ContentEditor
          content={markdown.markdown}
          id={markdown.id}
          userId={markdown.userId}
        />
      </Stack>
    </Container>
  );
};

export default UserProjectPage;
