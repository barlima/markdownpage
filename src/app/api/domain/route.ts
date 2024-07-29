import { apiResponse } from "@/utils/api/response";

export const POST = async (request: Request) => {
  const { domain, vercelProjectId } = await request.json();

  try {
    const response = await fetch(
      `https://api.vercel.com/v10/projects/${vercelProjectId}/domains`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: domain,
        }),
      }
    );

    console.log(response);

    return apiResponse(null, 204);
  } catch (error) {
    console.error(error);
    return apiResponse({ message: "Error creating domain" }, 500);
  }
};
