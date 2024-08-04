"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Alert, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";

import { signup } from "@/features/auth/actions/signup";
import {
  SignupSchema,
  signupSchema,
} from "@/features/auth/schema/signupSchema";
import { TextInputControl } from "@/controls/TextInputControl";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);

  const methods = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const {
    formState: { errors },
  } = methods;

  const handleSignup = async (values: SignupSchema) => {
    try {
      const { error } = await signup(values.email, values.password);

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
        <form onSubmit={methods.handleSubmit(handleSignup)}>
          <Stack gap={2}>
            <Typography variant="h4" component="h1" gutterBottom>
              Sign up to markdownpage.com
            </Typography>
            <TextInputControl
              name="email"
              label="Email"
              error={!!errors.email}
            />
            <TextInputControl
              name="password"
              label="Password"
              type="password"
              error={!!errors.password}
            />
            <TextInputControl
              name="passwordConfirmation"
              label="Password Confirmation"
              type="password"
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button type="submit" variant="contained">
              Sign up
            </Button>

            <Stack gap={2}>
              <Typography variant="body2">
                Already have an account?{" "}
                <Button variant="text" component={Link} href="/login">
                  Log in
                </Button>
              </Typography>
            </Stack>
          </Stack>
        </form>
      </FormProvider>
    </Container>
  );
}
