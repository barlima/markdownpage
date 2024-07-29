"use server";

import { createClient } from "@/services/database/server";

export const createMarkdown = async (id: string) => {
  const supabase = createClient();

  try {
    const {
      data: markdown,
      error,
      status,
    } = await supabase
      .from("markdown")
      .insert({
        userId: id,
        markdown: `
      # Welcome to markdownpage.com!

      This is an example body.

      Feel free to edit.
      `,
      })
      .select<"*">("*");

    if (error) {
      return { markdown: null, error, status };
    }

    return { markdown, error, status };
  } catch (error) {
    return { markdown: null, error, status: 500 };
  }
};
