"use client";

import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

type DomainProps = {
  domain: string;
  id: number;
  userId: string;
};

export const Domain: React.FC<DomainProps> = ({ domain, id, userId }) => {
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const domain = event.currentTarget.domain.value;

    try {
      await fetch(process.env.NEXT_PUBLIC_URL + `/api/domain/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          domain,
          userId,
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Typography variant="caption">.markdownpage.com</Typography>
              </InputAdornment>
            ),
          }}
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
