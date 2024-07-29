import React, { Suspense } from "react";
import { Stack, Typography } from "@mui/material";

import { UserProjects } from "@/features/profile/components/UserProjects";

const ProfilePage: React.FC = () => {
  return (
    <Stack>
      <Typography variant="h1">Profile</Typography>

      <Suspense fallback={<div>Loading...</div>}>
        <UserProjects />
      </Suspense>
    </Stack>
  );
};

export default ProfilePage;
