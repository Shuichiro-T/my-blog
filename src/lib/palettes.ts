/**
 * カラーパレット（アクセントカラー）の定義。
 * 色はデジタル庁デザインシステム(DADS)のカラーパレットに準拠する。
 * https://design.digital.go.jp/dads/foundations/color/color-palette/
 *
 * light は各パレットの Highlight（背景用強調色）、
 * dark はダーク背景でも視認性を保てるよう一段明るいチャートカラーを採用している。
 * 背景色・文字色（各パレットの 50 / 1200）は src/styles/global.css 側で定義する。
 */
export interface Palette {
  id: string;
  label: string;
  light: string;
  dark: string;
}

export const PALETTES: Palette[] = [
  { id: 'solid-gray', label: 'グレー', light: '#4D4D4D', dark: '#999999' },
  { id: 'blue', label: 'ブルー', light: '#0017C1', dark: '#7096F8' },
  { id: 'light-blue', label: '水色', light: '#0055AD', dark: '#57B8FF' },
  { id: 'cyan', label: 'シアン', light: '#006F83', dark: '#2BC8E4' },
  { id: 'green', label: 'グリーン', light: '#115A36', dark: '#51B883' },
  { id: 'orange', label: 'オレンジ', light: '#AC3E00', dark: '#FF8D44' },
  { id: 'red', label: 'レッド', light: '#CE0000', dark: '#FF7171' },
];

export const DEFAULT_PALETTE_ID = 'blue';

export const PALETTE_STORAGE_KEY = 'palette';

export const PALETTE_IDS = PALETTES.map((palette) => palette.id);
