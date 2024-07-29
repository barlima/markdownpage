"use server";

import { createClient } from "@/services/database/server";
import { Markdown } from "../../types/Markdown";

export const getMarkdown = async (userId: string) => {
  const supabase = createClient();

  const {
    data: markdown,
    error,
    status,
  } = await supabase
    .from("markdown")
    .select<"*", Markdown>("*")
    .eq("userId", userId);

  if (error) {
    return { markdown: null, error, status };
  }

  return { markdown: markdown[0], error, status };
};
