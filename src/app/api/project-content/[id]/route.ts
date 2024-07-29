import { partialUpdateUserProjectContent } from "@/features/profile/services/database/partialUpdateUserProjectContent";
import { apiResponse } from "@/utils/api/response";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const { markdown, user } = await request.json();

  const { error, status } = await partialUpdateUserProjectContent(
    Number(id),
    user,
    markdown
  );

  if (error) {
    return apiResponse({ message: error.message }, status);
  }

  return apiResponse(null, status);
};
