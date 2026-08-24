# 記事の書き方

## 1. 記事を作る

```bash
npm run new-post -- hello-astro --title "Astro で始めるブログ"
```

`src/content/blog/<年>/hello-astro/index.md` が `draft: true` の状態で作られます。
手で作る場合も同じ場所・同じファイル名にしてください。

## 2. フロントマターを埋める

```md
---
title: 'Astro で始めるブログ'
description: '一覧と OGP に出る 1〜2文の要約。'
pubDate: 2026-08-21
updatedDate: 2026-09-01
tags: ['astro', 'blog']
draft: false
heroImage: './hero.png'
heroImageAlt: 'Astro のロゴ'
---
```

| 項目 | 必須 | 型 | 説明 |
| --- | --- | --- | --- |
| `title` | ○ | 文字列 | 記事タイトル |
| `description` | ○ | 文字列 | 一覧・OGP・`<meta name="description">` に使う要約 |
| `pubDate` | ○ | 日付 | 公開日（`YYYY-MM-DD`） |
| `updatedDate` | | 日付 | 更新日。内容を書き直したときだけ入れる |
| `tags` | | 文字列の配列 | 省略時は `[]` |
| `draft` | | 真偽値 | `true` なら本番ビルドから除外。省略時は `false` |
| `heroImage` | | 画像パス | 記事フォルダ内の画像への相対パス |
| `heroImageAlt` | | 文字列 | `heroImage` の代替テキスト |

スキーマは `src/content.config.ts` で定義されています。項目名や型が違うと
ビルドが失敗するので、書き間違いはその場で分かります。

`heroImage` を設定すると、SNS でリンクをシェアしたときの OGP カード（`og:image`）
にもその画像が使われます。設定しない場合、画像なしのシンプルなカードになります。

## 3. 本文を書く

見出しは `##` から始めます（`#` は記事タイトルとして自動で出るため、本文では使いません）。

## 命名規則

- **フォルダ名（= slug）**: 英小文字・数字・ハイフンのみ。例 `astro-markdown-blog`
  - 日本語のフォルダ名は URL エンコードされて扱いづらいので使いません
- **タグ**: 英小文字ケバブケース。例 `github-actions`
  - 表記ゆれを防ぐため、新しいタグを足す前に `/tags` で既存タグを確認してください

## 画像

その記事でしか使わない画像は、記事と同じフォルダに置いて相対パスで参照します。

```md
![グラフの説明](./chart.png)
```

こう書くと Astro が最適化（リサイズ・フォーマット変換）してくれます。
`public/` に置いた画像は最適化されないので、favicon やサイト共通の
ファイルだけにしてください。

## 下書き

`draft: true` の記事は `npm run dev` では表示され、本番ビルドからは除外されます。
書きかけの記事もファイルを移動せずそのまま置いておけます。公開するときは
`draft: false` にして `pubDate` を公開日に直してください。

## 確認する

```bash
npm run dev      # http://localhost:4321 で確認
npm run build    # 本番と同じ条件でビルド（draft は除外される）
npm run preview  # ビルド結果を確認
```

公開前に `npm run build` を通しておくと、フロントマターの不備やリンク切れに気づけます。

## カテゴリについて

カテゴリは作らず、**タグのみ**で分類します。両方あると「どちらに入れるか」の
判断コストが毎回かかるためです。分類が足りなくなってから足す方針にしています。
