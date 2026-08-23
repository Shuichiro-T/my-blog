# CLAUDE.md

Astro + Markdown で書き、GitHub Pages で公開するブログ。

## コマンド

```bash
npm install
npm run dev                        # 開発サーバー (http://localhost:4321)
npm run build                      # 本番ビルド（draft: true の記事は除外される）
npm run check                      # 型・Astro のチェック
npm run new-post -- <slug>         # 記事のひな形を作る
```

変更したら `npm run build` を通してからコミットすること。

## フォルダ構成

`docs/structure.md` に全体像がある。要点だけ:

- `src/pages/` の階層 = URL。ページは「データを集めてレイアウトに渡す」だけにする
- ロジックは `src/lib/`（`posts.ts` = 記事の取得・絞り込み、`format.ts` = 日付と URL）
- サイト名・ナビ・件数などの定数は `src/consts.ts`。文字列を直書きしない
- コンポーネントは用途別に `common/`（汎用） `blog/`（記事まわり） `layout/`（枠）

## 記事

- 置き場所: `src/content/blog/<年>/<slug>/index.md`（**1記事 = 1フォルダ**）
- URL: `/blog/<slug>`。年は URL に含めない
- slug は英小文字・数字・ハイフンのみ。日本語は使わない
- その記事だけで使う画像は記事フォルダに置き、`./xxx.png` と相対パスで参照する
  （`public/` は favicon などサイト共通のファイル専用）
- フロントマターのスキーマは `src/content.config.ts`。**勝手に項目を増やさない**
  （増やすと全記事の修正が必要になる。必要なら先に相談する）
- 書きかけは `draft: true`。`drafts/` のような別フォルダは作らない
- 分類は**タグのみ**。カテゴリは作らない

詳細は `docs/writing-guide.md`。

## アウトプット

- ブログとは別に、登壇資料・Zenn/Qiita記事・技術書典の同人誌などの外部リンク一覧を `/outputs` で持つ
- 置き場所: `src/content/outputs/<任意のファイル名>.yaml`（**1アイテム = 1ファイル**、本文なし）
- SpeakerDeck/Zenn/Qiita には RSS があるが、会社アカウントの一部だけ載せたい・技術書典にはRSSがない、
  という事情から自動取得はせず**すべて手動登録**にしている
- スキーマは `src/content.config.ts` の `outputs` コレクション

詳細は `docs/outputs-guide.md`。

## リンクの書き方

`astro.config.mjs` で `base: '/my-blog'` を設定しているため、手書きの `href` に
base は自動で付かない。**内部リンクは必ず `href()` を通す**。

```astro
---
import { href } from '@/lib/format';
---
<a href={href('/blog')}>Blog</a>
```

## 制約

- `.github/workflows/` は GitHub App の権限で変更できない。
  ワークフローが必要な場合は内容を `docs/deployment.md` に書いて手動追加を依頼する
- UI ライブラリ（React/Vue/Tailwind 等）はまだ入れていない。
  追加が必要そうなときは、入れる前に理由と一緒に提案する
- スタイルは `src/styles/global.css` の CSS 変数 + 各コンポーネントの `<style>`。
  ダークモードは `prefers-color-scheme` で自動切り替え
