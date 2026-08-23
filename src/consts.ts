/**
 * サイト全体で使う定数。サイト名・URL などの直書きはここに集約する。
 */

export const SITE_TITLE = 'しゅういちろのよしなしごと';
export const SITE_DESCRIPTION =
  '普段感じていること、気づいたこと、学んだことなどをまとめていくブログです。';
export const SITE_LANG = 'ja';
export const AUTHOR = 'しゅういちろ';

/** 1ページあたりの記事数（記事一覧・タグ別一覧で使用） */
export const POSTS_PER_PAGE = 10;

/** ヘッダーのナビゲーション */
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/outputs', label: 'Outputs' },
  { href: '/tags', label: 'Tags' },
  { href: '/about', label: 'About' },
] as const;

/** アウトプット一覧の種別 → 表示ラベル */
export const OUTPUT_TYPES = {
  speakerdeck: 'SpeakerDeck',
  zenn: 'Zenn',
  qiita: 'Qiita',
  book: '技術書典',
} as const;

/** フッターの外部リンク */
export const SOCIAL_LINKS = [
  { href: 'https://x.com/shucho0103', label: 'X' },
] as const;
