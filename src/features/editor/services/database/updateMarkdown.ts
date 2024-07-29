import { createClient } from "@/services/database/server";

export const updateMarkdown = async (
  id: string,
  userId: string,
  markdown: string
) => {
  "use server";

  const supabase = createClient();

  const { error, status } = await supabase
    .from("markdown")
    .update({
      markdown,
    })
    .eq("id", id)
    .eq("userId", userId);

  if (error) {
    return { error, status };
  }

  return { error, status };
};
