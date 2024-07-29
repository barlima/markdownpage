"use client";

import React from "react";
import { Button } from "@mui/material";

import { useUser } from "@auth0/nextjs-auth0/client";

type SelectProjectButtonProps = {
  projectId: number;
};

export const SelectProjectButton: React.FC<SelectProjectButtonProps> = ({
  projectId,
}) => {
  const { user } = useUser();

  const handleSelectProject = async () => {
    if (!user?.email) {
      return;
    }

    await fetch(process.env.NEXT_PUBLIC_URL + "/api/user-projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        projectId,
      }),
    });
  };

  if (!user) {
    return null;
  }

  return (
    <Button variant="contained" onClick={handleSelectProject}>
      Select Project
    </Button>
  );
};
