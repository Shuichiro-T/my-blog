/**
 * サイト全体で使う定数。サイト名・URL などの直書きはここに集約する。
 */

export const SITE_TITLE = 'my-blog';
export const SITE_DESCRIPTION =
  'Markdown で記事を書き、Astro で静的 HTML に変換して GitHub Pages で公開するブログ。';
export const SITE_LANG = 'ja';
export const AUTHOR = 'Shuichiro.T';

/** 1ページあたりの記事数（記事一覧・タグ別一覧で使用） */
export const POSTS_PER_PAGE = 10;

/** ヘッダーのナビゲーション */
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/tags', label: 'Tags' },
  { href: '/about', label: 'About' },
] as const;

/** フッターの外部リンク */
export const SOCIAL_LINKS = [
  { href: 'https://github.com/Shuichiro-T', label: 'GitHub' },
] as const;

/** PC 幅の右サイドバーに埋め込む X (旧 Twitter) のユーザー名（@ なし） */
export const X_USERNAME = 'shucho0103';
