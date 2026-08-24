import { createServerFn } from "@tanstack/react-start";
import { fetchCatalog } from "./catalog.server";

export const getCatalog = createServerFn({ method: "GET" }).handler(async () => fetchCatalog());
