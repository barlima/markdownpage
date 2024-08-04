import { Header } from "@/layout/Header";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
