"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/services/database/server";
import { createMarkdown } from "@/features/editor/services/database/createMarkdown";

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

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
    redirect("/error");
  }

  if (response.user?.id) {
    await createMarkdown(response.user.id);
  }

  revalidatePath("/", "layout");
  redirect("/markdown");
}
