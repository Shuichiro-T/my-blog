/**
 * 表示モード（ライト/ダーク）の定義。
 * OS のダークモード設定（prefers-color-scheme）には依存せず、
 * ユーザーが明示的に選んだ場合にのみダークモードを表示する。
 */
export interface Theme {
  id: string;
  label: string;
}

export const THEMES: Theme[] = [
  { id: 'light', label: 'ライト' },
  { id: 'dark', label: 'ダーク' },
];

export const DEFAULT_THEME_ID = 'light';

export const THEME_STORAGE_KEY = 'theme';

export const THEME_IDS = THEMES.map((theme) => theme.id);
