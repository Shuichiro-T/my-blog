// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 独自ドメイン（blog.shuichiro.jp）で公開する前提の設定。
export default defineConfig({
  site: 'https://blog.shuichiro.jp',
  base: '',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
});
