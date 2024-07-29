"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export const Header: React.FC = () => {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return <main>Loading...</main>;
  }

  if (error) {
    return <main>Error: {error.message}</main>;
  }

  return (
    <Box
      component="header"
      display="flex"
      justifyContent="space-between"
      gap={2}
      p={2}
      borderBottom={(theme) => `1px solid ${theme.palette.divider}`}
    >
      <Stack direction="row" gap={2} alignItems="center">
        <Button component={Link} href="/projects">
          Projects
        </Button>
        {!!user && (
          <Button component={Link} href="/profile">
            Profile
          </Button>
        )}
      </Stack>
      {user ? (
        <Stack direction="row" gap={4} alignItems="center">
          <Typography variant="body1">{user.nickname}</Typography>
          <Button variant="contained" component="a" href="/api/auth/logout">
            Logout
          </Button>
        </Stack>
      ) : (
        <Button variant="contained" component="a" href="/api/auth/login">
          Login
        </Button>
      )}
    </Box>
  );
};
