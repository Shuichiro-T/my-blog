import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * 公開対象の記事を新しい順で返す。
 * draft: true の記事は本番ビルドでのみ除外される（dev では確認できる）。
 */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

/** 指定タグの記事を新しい順で返す */
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => post.data.tags.includes(tag));
}

/** 全タグを「記事数の多い順 → 名前順」で返す */
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const posts = await getPublishedPosts();
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** 記事の URL パス（base は含まない。href() に渡して使う） */
export function postPath(post: Post): string {
  return `/blog/${post.id}`;
}

export interface ArchiveMonth {
  year: number;
  /** 1〜12 */
  month: number;
  count: number;
}

export interface ArchiveYear {
  year: number;
  count: number;
  /** 新しい月順 */
  months: ArchiveMonth[];
}

/** 公開記事を「年 → 月」の階層でグルーピングし、新しい順で返す */
export async function getArchives(): Promise<ArchiveYear[]> {
  const posts = await getPublishedPosts();
  const years = new Map<number, Map<number, number>>();

  for (const post of posts) {
    const { pubDate } = post.data;
    const year = pubDate.getUTCFullYear();
    const month = pubDate.getUTCMonth() + 1;
    const months = years.get(year) ?? new Map<number, number>();
    months.set(month, (months.get(month) ?? 0) + 1);
    years.set(year, months);
  }

  return [...years.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, months]) => ({
      year,
      count: [...months.values()].reduce((sum, n) => sum + n, 0),
      months: [...months.entries()]
        .sort((a, b) => b[0] - a[0])
        .map(([month, count]) => ({ year, month, count })),
    }));
}

/** 指定した年（と任意で月）の記事を新しい順で返す */
export async function getPostsByYearMonth(year: number, month?: number): Promise<Post[]> {
  const posts = await getPublishedPosts();
  return posts.filter((post) => {
    const { pubDate } = post.data;
    if (pubDate.getUTCFullYear() !== year) return false;
    if (month !== undefined && pubDate.getUTCMonth() + 1 !== month) return false;
    return true;
  });
}
