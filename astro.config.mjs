// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages（プロジェクトページ）で公開する前提の設定。
// 独自ドメインに変える場合は site を書き換え、base は削除してください。
export default defineConfig({
  site: 'https://shuichiro-t.github.io',
  base: '/my-blog',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
