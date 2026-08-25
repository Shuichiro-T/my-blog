# my-blog

Markdownで記事を書き、Astroで静的HTMLに変換してGitHub Pagesで公開するブログ。

## アーキテクチャ

```
Markdown (src/content/blog/) → Astro (ビルド) → GitHub Pages (公開)
```

## セットアップ

```bash
npm install
npm run dev
```

http://localhost:4321 を開きます。

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動（`draft: true` の記事も表示される） |
| `npm run build` | `dist/` に本番ビルド（`draft: true` の記事は除外） |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run check` | 型と Astro のチェック |
| `npm run new-post -- <slug>` | 記事のひな形を作成 |

## 記事を書く

```bash
npm run new-post -- hello-astro --title "Astro で始めるブログ"
```

`src/content/blog/<年>/<slug>/index.md` が作られます。フロントマターの項目や
命名規則は [docs/writing-guide.md](docs/writing-guide.md) を参照してください。

## ドキュメント

- [docs/structure.md](docs/structure.md) — フォルダ構成と URL 設計
- [docs/writing-guide.md](docs/writing-guide.md) — 記事の書き方・フロントマター規約
- [docs/outputs-guide.md](docs/outputs-guide.md) — アウトプット（外部リンク一覧）の登録方法
- [docs/deployment.md](docs/deployment.md) — GitHub Pages への公開手順

## Claudeによる開発

Issueから `@claude` を呼び出すと、Claudeが変更内容を実装してPRを作成します。
リポジトリ側の規約は [CLAUDE.md](CLAUDE.md) にまとめてあります。

### 使い方

1. GitHubでIssueを作成し、やりたいことを書く
2. Issueのコメントで `@claude` とメンションする（またはIssue作成時に `claude` ラベルを付ける）
3. Claudeがブランチを作成し、実装してPRを開く

### シークレット

リポジトリの Settings > Secrets and variables > Actions に以下を設定:

- `ANTHROPIC_API_KEY` — Anthropic APIキー

## 今後の予定

- [x] Astroプロジェクトの初期セットアップ
- [x] ブログ記事テンプレートの作成
- [x] GitHub Pagesへのデプロイワークフロー（[手順](docs/deployment.md)）
