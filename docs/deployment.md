# GitHub Pages への公開

> **注意**: `.github/workflows/` 配下のファイルは Claude（GitHub App）の権限では
> 変更できません。ワークフローの内容を変えたい場合は、このファイルを更新した上で
> 変更後の内容を**手動で反映してください**。

以下の 2 ワークフローと Settings → Pages の設定はすでに済んでいます
（`npm ci` を使うため `package-lock.json` もコミット済みです）。

## リポジトリの設定

Settings → Pages → **Build and deployment** → Source は **GitHub Actions** にしてあります。

## `.github/workflows/deploy.yml`

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

## `.github/workflows/ci.yml`

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
| 独自ドメイン（現在の設定） | `https://blog.shuichiro.jp` | 削除 | `https://blog.shuichiro.jp` |
| プロジェクトページ | `https://shuichiro-t.github.io` | `/my-blog` | `https://shuichiro-t.github.io/my-blog` |
| ユーザーページ（`Shuichiro-T.github.io` リポジトリ） | `https://shuichiro-t.github.io` | 削除 | `https://shuichiro-t.github.io` |

`base` を変える場合は `public/robots.txt` の Sitemap の URL も合わせて直してください。

独自ドメインを使う場合は `public/CNAME` にドメイン名だけを書いたファイルを置きます
（`blog.shuichiro.jp` を設定済み）。

また、以下は GitHub の UI 側で手動設定が必要です（Claude からは変更できません）。

- ドメインの DNS で GitHub Pages 向けの CNAME レコード（`blog.shuichiro.jp` →
  `shuichiro-t.github.io`）を設定する
- Settings → Pages → **Custom domain** に `blog.shuichiro.jp` を入力し、
  DNS 反映後に **Enforce HTTPS** を有効にする
