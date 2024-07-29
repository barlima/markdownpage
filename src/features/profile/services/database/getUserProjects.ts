import { getSession } from "@auth0/nextjs-auth0";

import { createClient } from "@/services/database/server";
import { UserProject } from "../../types/UserProject";

export const getUserProjects = async () => {
  "use server";

  const supabase = createClient();
  const session = await getSession();

  const {
    data: projects,
    error,
    status,
  } = await supabase
    .from("user-project")
    .select<"id, project(*)", UserProject>(`id, project(*)`)
    .eq("user", session?.user.email);

  if (error) {
    return { projects: [], error, status };
  }

  return { projects, error, status };
};
