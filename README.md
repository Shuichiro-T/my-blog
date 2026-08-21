# my-blog

Markdownで記事を書き、Astroで静的HTMLに変換してGitHub Pagesで公開するブログ。

## アーキテクチャ

```
Markdown (src/content/) → Astro (ビルド) → GitHub Pages (公開)
```

## Claudeによる開発

Issueから `@claude` を呼び出すと、Claudeが変更内容を実装してPRを作成します。

### 使い方

1. GitHubでIssueを作成し、やりたいことを書く
2. Issueのコメントで `@claude` とメンションする（またはIssue作成時に `claude` ラベルを付ける）
3. Claudeがブランチを作成し、実装してPRを開く

### セットアップ

リポジトリの Settings > Secrets and variables > Actions に以下を設定:

- `ANTHROPIC_API_KEY` — Anthropic APIキー

## 今後の予定

- [ ] Astroプロジェクトの初期セットアップ
- [ ] GitHub Pagesへのデプロイワークフロー
- [ ] ブログ記事テンプレートの作成
