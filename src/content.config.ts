import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 記事は「1記事 = 1フォルダ」で管理する。
 *
 *   src/content/blog/2026/hello-astro/index.md  → /blog/hello-astro
 *   src/content/blog/2026/hello-astro/hero.png  → 同じフォルダに画像を同梱
 *
 * 年フォルダはファイル一覧を見やすくするためだけのもので、URL には含めない。
 */
const blog = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/blog',
    // '2026/hello-astro/index.md' → 'hello-astro'
    generateId: ({ entry }) => entry.split('/').at(-2)!,
  }),
  schema: ({ image }) =>
    z.object({
      /** 記事タイトル */
      title: z.string(),
      /** 一覧・OGP・description に使う要約 */
      description: z.string(),
      /** 公開日 (YYYY-MM-DD) */
      pubDate: z.coerce.date(),
      /** 更新日 (YYYY-MM-DD)。書き直したときだけ入れる */
      updatedDate: z.coerce.date().optional(),
      /** タグ。英小文字ケバブケース推奨 */
      tags: z.array(z.string()).default([]),
      /** true の場合、本番ビルドから除外される（dev では表示される） */
      draft: z.boolean().default(false),
      /** 記事フォルダ内の画像を相対パスで指定する */
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
    }),
});

export const collections = { blog };
