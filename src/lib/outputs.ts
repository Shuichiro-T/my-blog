import { getCollection, type CollectionEntry } from 'astro:content';

export type Output = CollectionEntry<'outputs'>;

/** 全アウトプットを新しい順で返す */
export async function getAllOutputs(): Promise<Output[]> {
  const outputs = await getCollection('outputs');
  return outputs.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}
