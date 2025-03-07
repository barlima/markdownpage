"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Alert, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import { login } from "@/features/auth/actions/login";
import { LoginSchema, loginSchema } from "@/features/auth/schema/loginSchema";
import { TextInputControl } from "@/controls/TextInputControl";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (values: LoginSchema) => {
    try {
      const { error } = await login(values.email, values.password);

      if (error) {
        setError(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        direction: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleLogin)}>
          <Stack gap={2}>
            <Typography variant="h4" component="h1" gutterBottom>
              Log in to markdownpage.com
            </Typography>
            <TextInputControl name="email" label="Email" />
            <TextInputControl
              name="password"
              label="Password"
              type="password"
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button type="submit" variant="contained">
              Log in
            </Button>

            <Stack gap={2}>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Button variant="text" component={Link} href="/signup">
                  Sign up
                </Button>
              </Typography>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </Container>
  );
}
