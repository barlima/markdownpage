import { createClient } from "@/services/database/server";

export const partialUpdateUserProjectContent = async (
  id: number,
  user: string,
  markdown: string
) => {
  "use server";

  const supabase = createClient();

  const { error, status } = await supabase
    .from("project-content")
    .update({
      markdown,
    })
    .eq("id", id)
    .eq("user", user);

  if (error) {
    return { error, status };
  }

  return { error, status };
};
