"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
