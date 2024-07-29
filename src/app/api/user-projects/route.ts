import { createUserProject } from "@/features/profile/services/database/createUserProject";
import { apiResponse } from "@/utils/api/response";

export const POST = async (request: Request) => {
  const { email, projectId } = await request.json();
  const { project, error, status } = await createUserProject(email, projectId);

  if (error) {
    return apiResponse({ message: error.message }, status);
  }

  return apiResponse(project, status);
};
