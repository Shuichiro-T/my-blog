# アウトプットの登録

登壇資料・Zenn/Qiita記事・技術書典の同人誌などを `/outputs` に一覧表示するための
仕組みです。ブログ記事と違い本文は持たず、外部リンクのメタデータだけを管理します。

## 登録する

`src/content/outputs/` に YAML ファイルを1つ追加します（1アイテム = 1ファイル）。
ファイル名は好きに付けられます（例: `2026-08-zenn-astro-blog.yaml`）。

### SpeakerDeck の場合

```yaml
title: 'Claude Code を使いこなす 試行プロセスと思考プロセス'
url: 'https://speakerdeck.com/shucho0103/claude-code-woshi-ikonasu-...'
type: speakerdeck
pubDate: 2025-11-06
embedId: 'abc123def456...'
```

`embedId` は SpeakerDeck の埋め込みコードから取得します:

1. SpeakerDeck のスライドページを開く
2. 「Share」→「Embed」をクリック
3. 埋め込みコードの `data-id="..."` の値をコピー

`embedId` があるとスライドの iframe 埋め込みが表示されます。

### Zenn・Qiita・技術書典の場合

```yaml
title: 'Astro で始めるブログ'
url: 'https://zenn.dev/xxx/articles/yyy'
type: zenn
pubDate: 2026-08-21
ogImage: 'https://res.cloudinary.com/zenn/image/upload/...'
```

`ogImage` は各サイトの OGP 画像 URL を指定します。取得方法:

1. リンク先をブラウザで開く
2. ページのソースから `<meta property="og:image" content="...">` の URL をコピー
   - Chrome: 右クリック →「ページのソースを表示」→ `og:image` で検索
   - または開発者ツールで `document.querySelector('meta[property="og:image"]').content` を実行

`ogImage` があると OGP 画像のプレビューが表示されます。

## フィールド一覧

| 項目 | 必須 | 型 | 説明 |
| --- | --- | --- | --- |
| `title` | ○ | 文字列 | タイトル |
| `url` | ○ | URL | リンク先 |
| `type` | ○ | `speakerdeck` \| `zenn` \| `qiita` \| `book` | 表示ラベルは `src/consts.ts` の `OUTPUT_TYPES` |
| `pubDate` | ○ | 日付 | 公開日（`YYYY-MM-DD`） |
| `tags` | | 文字列の配列 | 省略時は `[]` |
| `embedId` | | 文字列 | SpeakerDeck の埋め込み ID（`data-id`） |
| `ogImage` | | URL | OGP 画像の URL（Zenn・Qiita・技術書典で使用） |

`embedId` / `ogImage` はどちらもオプションです。省略した場合はタイトルリンクのみ表示されます。

## 補足

SpeakerDeck・Zenn・Qiita は自動取得（RSS/API）も技術的には可能ですが、
- 会社アカウントの SpeakerDeck は一部だけ載せたい
- 技術書典の同人誌には RSS がない

という事情があるため、すべて手動登録に寄せています。個別に発表・投稿するたびに
1ファイル追加してください。

スキーマは `src/content.config.ts` の `outputs` コレクションで定義されています。
