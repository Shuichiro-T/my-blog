# アウトプットの登録

登壇資料・Zenn/Qiita記事・技術書典の同人誌などを `/outputs` に一覧表示するための
仕組みです。ブログ記事と違い本文は持たず、外部リンクのメタデータだけを管理します。

## 登録する

`src/content/outputs/` に YAML ファイルを1つ追加します（1アイテム = 1ファイル）。
ファイル名は好きに付けられます（例: `2026-08-zenn-astro-blog.yaml`）。

```yaml
title: 'Astro で始めるブログ'
url: 'https://zenn.dev/xxx/articles/yyy'
type: zenn # speakerdeck | zenn | qiita | book
pubDate: 2026-08-21
tags: ['astro']
```

| 項目 | 必須 | 型 | 説明 |
| --- | --- | --- | --- |
| `title` | ○ | 文字列 | タイトル |
| `url` | ○ | URL | リンク先 |
| `type` | ○ | `speakerdeck` \| `zenn` \| `qiita` \| `book` | 表示ラベルは `src/consts.ts` の `OUTPUT_TYPES` |
| `pubDate` | ○ | 日付 | 公開日（`YYYY-MM-DD`） |
| `tags` | | 文字列の配列 | 省略時は `[]` |

SpeakerDeck・Zenn・Qiita は自動取得（RSS/API）も技術的には可能ですが、
- 会社アカウントの SpeakerDeck は一部だけ載せたい
- 技術書典の同人誌には RSS がない

という事情があるため、すべて手動登録に寄せています。個別に発表・投稿するたびに
1ファイル追加してください。

スキーマは `src/content.config.ts` の `outputs` コレクションで定義されています。
