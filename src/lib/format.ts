import { SITE_LANG } from '@/consts';

/** 表示用の日付文字列（例: 2026年8月21日） */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat(SITE_LANG, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/** <time datetime="..."> に入れる ISO 日付（例: 2026-08-21） */
export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/**
 * base 付きの URL を組み立てる。
 * astro.config.mjs の `base` を設定していると、手書きの href は自分で前置きする必要がある。
 */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}` || '/';
}
