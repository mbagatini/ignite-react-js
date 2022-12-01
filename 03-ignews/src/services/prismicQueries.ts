import { Document } from "@prismicio/client/types/documents";
import { Client } from "./prismic";

// ~/utils/queries.js
async function fetchDocs(page = 1, routes: Document[]): Promise<Document[]> {
  const response = await Client().query("", { pageSize: 100, lang: "*", page });
  const allRoutes = routes.concat(response.results);

  if (response.results_size + routes.length < response.total_results_size) {
    return fetchDocs(page + 1, allRoutes);
  }

  return allRoutes;
}

/** Fetches all Prismic documents and filters them (eg. by document type).
 *  In production, you would probably query documents by type instead of filtering them.
 **/
export async function queryRepeatableDocuments(filter: () => {}) {
  const allRoutes = await fetchDocs(1, []);
  return allRoutes.filter(filter);
}
