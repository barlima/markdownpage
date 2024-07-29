import { createClient } from "@/services/database/server";
import { UserProject } from "../../types/UserProject";

export const createUserProject = async (email: string, projectId: number) => {
  "use server";

  const supabase = createClient();

  const {
    data: projects,
    error,
    status,
  } = await supabase
    .from("user-project")
    .insert({
      user: email,
      projectId,
    })
    .select<"*, project(keys)", UserProject>("*, project(keys)");

  if (error) {
    return { project: null, error, status };
  }

  const { id, project } = projects?.[0];

  await Promise.allSettled(
    project.keys.map((key) =>
      supabase.from("project-content").insert({
        projectId,
        key,
        userProjectId: id,
        markdown: `
        # Hello

        This is an example message.

        Feel free to edit.
        `,
      })
    )
  );

  return { project, error, status };
};
