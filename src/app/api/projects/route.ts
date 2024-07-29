import { getProjects } from "@/features/projects/services/database/getProjects";
import { apiResponse } from "@/utils/api/response";

export const GET = async () => {
  const { projects, error, status } = await getProjects();

  if (error) {
    return apiResponse(
      {
        message: error.message,
      },
      status
    );
  }

  return apiResponse(projects, status);
};
