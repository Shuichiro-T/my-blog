# GitHub Pages への公開

> **注意**: `.github/workflows/` 配下のファイルは Claude（GitHub App）の権限では
> 作成・変更できません。以下の 2 ファイルは**手動で追加してください**。
> 内容はそのままコピーで動きます。

## 0. 先に `package-lock.json` をコミットする

下のワークフローは `npm ci` と `cache: npm` を使うため、`package-lock.json` が
リポジトリに必要です。まだ無い場合は一度ローカルで作ってコミットしてください。

```bash
npm install
git add package-lock.json
git commit -m "chore: add package-lock.json"
```

## 1. リポジトリの設定

Settings → Pages → **Build and deployment** → Source を **GitHub Actions** にします。

## 2. `.github/workflows/deploy.yml` を追加する

`main` への push でビルドして GitHub Pages に公開します。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

# 実行中のデプロイは中断せず、キューは最新の 1 件だけ残す
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## 3. `.github/workflows/ci.yml` を追加する

Pull Request でビルドが通るかだけ確認します。記事のフロントマターの不備は
ここで落ちます。

```yaml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run check
      - run: npm run build
```

## 公開先の URL

`astro.config.mjs` の設定と対応します。

| 公開方法 | `site` | `base` | URL |
| --- | --- | --- | --- |
| プロジェクトページ（現在の設定） | `https://shuichiro-t.github.io` | `/my-blog` | `https://shuichiro-t.github.io/my-blog` |
| ユーザーページ（`Shuichiro-T.github.io` リポジトリ） | `https://shuichiro-t.github.io` | 削除 | `https://shuichiro-t.github.io` |
| 独自ドメイン | `https://example.com` | 削除 | `https://example.com` |

`base` を変える場合は `public/robots.txt` の Sitemap の URL も合わせて直してください。

独自ドメインを使う場合は `public/CNAME` にドメイン名だけを書いたファイルを置きます。
