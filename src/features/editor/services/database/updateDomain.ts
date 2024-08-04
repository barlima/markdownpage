import { createClient } from "@/services/database/server";

export const updateDomain = async (
  id: string,
  userId: string,
  domain: string
) => {
  "use server";

  const supabase = createClient();

  const { error, status } = await supabase
    .from("markdown")
    .update({
      domain,
    })
    .eq("id", id)
    .eq("userId", userId);

  if (error) {
    return { error, status };
  }

  return { error, status };
};
