/**
 * カラーパレット（配色）の定義。
 * 色はデジタル庁デザインシステム(DADS)のカラーパレットに準拠する。
 * https://design.digital.go.jp/dads/foundations/color/color-palette/
 *
 * 一番下の `dark` はダークモード（グレー基調）を表す特別なパレットで、
 * 選択すると背景・文字色が反転した暗い配色になる。
 * 実際の色（背景色・文字色・アクセントカラー）は src/styles/global.css 側で定義する。
 */
export interface Palette {
  id: string;
  label: string;
}

export const PALETTES: Palette[] = [
  { id: 'solid-gray', label: 'グレー' },
  { id: 'blue', label: 'ブルー' },
  { id: 'light-blue', label: '水色' },
  { id: 'cyan', label: 'シアン' },
  { id: 'green', label: 'グリーン' },
  { id: 'orange', label: 'オレンジ' },
  { id: 'red', label: 'レッド' },
  { id: 'dark', label: 'ダーク' },
];

export const DEFAULT_PALETTE_ID = 'solid-gray';

export const PALETTE_STORAGE_KEY = 'palette';

export const PALETTE_IDS = PALETTES.map((palette) => palette.id);
