import { createClient } from "@/services/database/server";
import { UserProject } from "../../types/UserProject";
import { getSession } from "@auth0/nextjs-auth0";

export const getUserProject = async (id: number) => {
  "use server";

  const supabase = createClient();
  const session = await getSession();

  const {
    data: projects,
    error,
    status,
  } = await supabase
    .from("user-project")
    .select<"*, project(keys, vercelId, domain)", UserProject>(
      "*, project(keys, vercelId, domain)"
    )
    .eq("user", session?.user.email)
    .eq("id", id);

  if (error) {
    return { project: null, error, status };
  }

  const userProject = projects?.[0];

  return { userProject, error, status };
};
