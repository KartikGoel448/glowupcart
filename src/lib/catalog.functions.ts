import { createServerFn } from "@tanstack/react-start";

export const getCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const { fetchCatalog } = await import("./catalog.server");
  return fetchCatalog();
});
