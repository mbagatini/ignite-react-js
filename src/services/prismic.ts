import Prismic from '@prismicio/client';
import { Document } from '@prismicio/client/types/documents';
import { DefaultClient } from '@prismicio/client/types/client';

// -- Prismic Repo Name
export const repoName = 'ignite-desafio-blog-prismic';

export function getPrismicClient(req?: unknown): DefaultClient {
  const prismic = Prismic.client(process.env.PRISMIC_API_ENDPOINT || '', {
    req,
    accessToken: process.env.PRISMIC_API_ACCESS_TOKEN,
  });

  return prismic;
}

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export function linkResolver(doc: Document) {
  if (doc.type === 'page') {
    return `/${doc.uid}`;
  }
  return '/';
}
