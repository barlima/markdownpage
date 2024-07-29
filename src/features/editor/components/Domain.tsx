"use client";

import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

type DomainProps = {
  domain: string;
};

export const Domain: React.FC<DomainProps> = ({ domain }) => {
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const domain = event.currentTarget.domain.value;

    try {
      await fetch(`/api/domain`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          domain: domain,
        }),
      });
    } catch (error) {
      console.error(error);
      setError(error as Error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error.message}
        </Alert>
      )}

      <Stack direction={"row"} gap={2}>
        <TextField
          id="domain"
          size="small"
          defaultValue={domain}
          label="Domain"
          fullWidth
        />
        <Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ whiteSpace: "nowrap" }}
          >
            Save Domain
          </Button>
        </Box>
      </Stack>
    </form>
  );
};
