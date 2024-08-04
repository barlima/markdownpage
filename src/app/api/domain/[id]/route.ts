import { updateDomain } from "@/features/editor/services/database/updateDomain";
import { apiResponse } from "@/utils/api/response";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const { domain, userId } = await request.json();

  if (!domain || !userId || !id) {
    return apiResponse({ message: "Missing required parameters" }, 400);
  }

  try {
    const { error, status } = await updateDomain(id, userId, domain);

    if (error) {
      return apiResponse({ message: error.message }, status);
    }

    return apiResponse(null, 204);
  } catch (error) {
    return apiResponse({ message: "Error creating domain" }, 500);
  }
};
