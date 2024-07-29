import { Button, Stack, Typography, Toolbar } from "@mui/material";
import Link from "next/link";
import React from "react";

import { getCurrentUser } from "@/features/auth/utils/getCurrentUser";
import { Logout } from "./Logout";

export const Header: React.FC = async () => {
  const user = await getCurrentUser();

  return (
    <Toolbar
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 2,
        p: 2,
      }}
    >
      <Stack direction="row" gap={2} alignItems="center">
        {!!user && (
          <Button component={Link} href="/markdown">
            Edit Markdown
          </Button>
        )}
      </Stack>
      {user ? (
        <Stack direction="row" gap={4} alignItems="center">
          <Typography variant="body1">{user.email}</Typography>
          <Logout />
        </Stack>
      ) : (
        <Button variant="contained" component={Link} href="/login">
          Login
        </Button>
      )}
    </Toolbar>
  );
};
