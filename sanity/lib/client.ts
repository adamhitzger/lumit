import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import type { QueryParams } from "next-sanity";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  
}: {
  query: string;
  params?: QueryParams;
  
}) {
  return client.fetch<QueryResponse>(query, params, {
    useCdn: true,
    next: { revalidate: 30 },
  });
}
