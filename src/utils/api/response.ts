export const apiResponse = <
  TData extends Record<string, unknown> | Array<unknown> | null
>(
  data: TData,
  status: number,
  headers: HeadersInit = {}
) => {
  return new Response(data ? JSON.stringify(data) : null, {
    status,
    headers,
  });
};
