import { apiResponse } from "@/utils/api/response";

export const POST = async (request: Request) => {
  const { domain } = await request.json();

  try {
    const response = await fetch(
      `https://api.vercel.com/v10/projects/${process.env.MARKDOWN_VERCEL_ID}/domains`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: domain + process.env.MARKDOWN_DOMAIN,
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
