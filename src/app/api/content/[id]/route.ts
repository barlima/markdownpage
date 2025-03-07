import { updateMarkdown } from "@/features/editor/services/database/updateMarkdown";
import { apiResponse } from "@/utils/api/response";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const { markdown, userId } = await request.json();

  if (!markdown || !userId || !id) {
    return apiResponse({ message: "Missing required parameters" }, 400);
  }

  try {
    const { error, status } = await updateMarkdown(id, userId, markdown);

    if (error) {
      return apiResponse({ message: error.message }, status);
    }

    return apiResponse(null, status);
  } catch (error) {
    return apiResponse({ message: "Error updating content" }, 500);
  }
};
