"use client";

import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

import { createClient } from "@/services/database/client";

export const Logout: React.FC = () => {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};
