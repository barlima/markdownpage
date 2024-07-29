import { getSession } from "@auth0/nextjs-auth0";

import { createClient } from "@/services/database/server";
import { ProjectContent } from "@/features/projects/types/ProjectContent";

export const getUserProjectContent = async (
  key: string,
  userProjectId: number
) => {
  "use server";

  const supabase = createClient();
  const session = await getSession();

  const {
    data: projectContent,
    error,
    status,
  } = await supabase
    .from("project-content")
    .select<"id, key, markdown", ProjectContent>("id, key, markdown")
    .eq("key", key)
    .eq("userProjectId", userProjectId)
    .eq("user", session?.user.email);

  if (error) {
    return { projectContent: null, error, status };
  }

  return { projectContent: projectContent[0], error, status };
};
