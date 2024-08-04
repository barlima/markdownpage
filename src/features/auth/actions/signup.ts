"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/services/database/server";
import { createMarkdown } from "@/features/editor/services/database/createMarkdown";

export async function signup(email: string, password: string) {
  const supabase = createClient();

  const { error, data: response } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        email,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (response.user?.id) {
    await createMarkdown(response.user.id);
  }

  revalidatePath("/", "layout");
  redirect("/markdown");
}
