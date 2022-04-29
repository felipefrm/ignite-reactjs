import * as prismic from '@prismicio/client';
import { HttpRequestLike } from '@prismicio/client';
import { enableAutoPreviews } from '@prismicio/next';
import sm from '../../sm.json'

export const endpoint = sm.apiEndpoint
export const repositoryName = prismic.getRepositoryName(endpoint)

export interface PrismicConfig {
  req?: HttpRequestLike;
}

export function linkResolver(doc): string {
  if (doc.type === 'posts') {
    return `/post/${doc.uid}`;
  }
  return '/';
}

export function getPrismicClient(config: PrismicConfig): prismic.Client {
  const client = prismic.createClient(
    process.env.PRISMIC_API_ENDPOINT,
    {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );

  enableAutoPreviews({
    client,
    req: config.req,
  })

  return client;
}
