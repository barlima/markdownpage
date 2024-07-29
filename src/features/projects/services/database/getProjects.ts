import { createClient } from "@/services/database/server";
import { Project } from "../../types/Project";

export const getProjects = async () => {
  "use server";

  const supabase = createClient();

  const {
    data: projects,
    error,
    status,
  } = await supabase.from("project").select<"*", Project>("*");

  if (error) {
    return { projects: [], error, status };
  }

  return { projects, error, status };
};
