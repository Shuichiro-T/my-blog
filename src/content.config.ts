import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 記事は「1記事 = 1フォルダ」で管理する。
 *
 *   src/content/blog/2026/hello-astro/index.md  → /blog/2026/hello-astro
 *   src/content/blog/2026/hello-astro/hero.png  → 同じフォルダに画像を同梱
 */
const blog = defineCollection({
  loader: glob({
    pattern: '**/index.md',
    base: './src/content/blog',
    // '2026/hello-astro/index.md' → '2026/hello-astro'
    generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
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

/**
 * アウトプット（SpeakerDeck・Zenn・Qiita・技術書典など）はブログと違い、
 * サイト内に本文を持たない外部リンクの一覧として管理する。
 * 1アイテム = 1ファイル（YAML）で src/content/outputs/ に置く。
 */
const outputs = defineCollection({
  loader: glob({
    pattern: '*.yaml',
    base: './src/content/outputs',
  }),
  schema: z.object({
    /** タイトル */
    title: z.string(),
    /** リンク先 URL */
    url: z.string().url(),
    /** 種別。表示ラベルは consts.ts の OUTPUT_TYPES 参照 */
    type: z.enum(['speakerdeck', 'zenn', 'qiita', 'book']),
    /** 公開日 (YYYY-MM-DD) */
    pubDate: z.coerce.date(),
    /** タグ。英小文字ケバブケース推奨 */
    tags: z.array(z.string()).default([]),
    /** SpeakerDeck の埋め込み用 ID（埋め込みコードの data-id） */
    embedId: z.string().optional(),
    /** OGP 画像の URL（Zenn・Qiita・技術書典で使用） */
    ogImage: z.string().url().optional(),
  }),
});

export const collections = { blog, outputs };
