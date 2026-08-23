# フォルダ構成

```
my-blog/
├── .github/
│   ├── ISSUE_TEMPLATE/          # Issue テンプレート
│   └── workflows/
│       └── claude.yml           # @claude メンションで動くワークフロー
│                                # deploy.yml / ci.yml は docs/deployment.md 参照
├── docs/                        # ブログ運営側のドキュメント（サイトには出ない）
│   ├── structure.md             # このファイル
│   ├── writing-guide.md         # 記事の書き方・フロントマター規約
│   ├── outputs-guide.md         # アウトプット（外部リンク一覧）の登録方法
│   └── deployment.md            # GitHub Pages への公開手順
├── scripts/
│   └── new-post.mjs             # 記事のひな形生成
├── public/                      # そのまま配信される静的ファイル
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/              # 汎用パーツ（Tag, FormattedDate）
│   │   ├── blog/                # 記事まわり（PostCard, PostList, Pagination, Archive）
│   │   ├── output/              # アウトプットまわり（OutputCard, OutputList）
│   │   └── layout/              # BaseHead, Header, Footer
│   ├── content/
│   │   ├── blog/
│   │   │   └── 2026/            # 年で区切る（URL には出ない）
│   │   │       └── hello-astro/
│   │   │           ├── index.md # 記事本文
│   │   │           └── *.png    # その記事だけで使う画像
│   │   └── outputs/             # SpeakerDeck・Zenn・Qiita・技術書典など（1アイテム=1YAML）
│   ├── layouts/
│   │   ├── BaseLayout.astro     # 全ページ共通の枠
│   │   └── PostLayout.astro     # 記事ページの枠
│   ├── lib/                     # ロジック（.astro に溜めない）
│   │   ├── posts.ts             # 記事の取得・絞り込み・ソート
│   │   └── format.ts            # 日付整形、base 付き URL の組み立て
│   ├── pages/                   # ← ここの階層がそのまま URL になる
│   │   ├── index.astro          # /
│   │   ├── about.astro          # /about
│   │   ├── 404.astro            # 404 ページ
│   │   ├── rss.xml.ts           # /rss.xml
│   │   ├── blog/
│   │   │   ├── index.astro      # /blog（1ページ目）
│   │   │   ├── page/[page].astro# /blog/page/2 以降
│   │   │   ├── [year]/index.astro       # /blog/2026
│   │   │   ├── [year]/[month]/index.astro # /blog/2026/08
│   │   │   └── [...slug].astro  # /blog/hello-astro
│   │   ├── outputs/
│   │   │   └── index.astro      # /outputs
│   │   └── tags/
│   │       ├── index.astro      # /tags
│   │       └── [tag].astro      # /tags/astro
│   ├── styles/
│   │   └── global.css
│   ├── consts.ts                # サイト名・ナビ・1ページの件数などの定数
│   └── content.config.ts        # フロントマター・アウトプットのスキーマ定義
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── CLAUDE.md                    # Claude 向けのリポジトリ規約
└── README.md
```

## それぞれの役割

### `src/pages/`

Astro の規約で、ここのファイル階層がそのまま URL になります。ここだけは自由に
変えられません。ページは「データを集めて、レイアウトに渡す」だけにして、
ロジックは `src/lib/` に置きます。

### `src/content/blog/`

記事の置き場所です。**1記事 = 1フォルダ**にして、その記事でしか使わない画像を
同じフォルダに入れます。こうすると記事の移動・削除がフォルダ単位で完結し、
`public/images/` に全記事分の画像が混ざることもありません。

フォルダ名がそのまま URL の slug になります（`hello-astro/` → `/blog/hello-astro`）。
年フォルダはファイル一覧を見やすくするためだけのもので、URL には出ません。

### `src/content/outputs/`

SpeakerDeck・Zenn・Qiita・技術書典などの外部リンク一覧です。ブログと違い本文を
持たないので、**1アイテム = 1YAMLファイル**で管理します。登録方法は
`docs/outputs-guide.md` 参照。

### `src/lib/`

日付整形や記事の絞り込みなどのロジックをここに集めます。`.astro` ファイルに
ロジックが溜まると再利用もテストもしづらくなるので、2箇所以上で使うものは
ここに切り出してください。

### `src/consts.ts`

サイト名・説明・ナビゲーション・1ページあたりの件数など。文字列の直書きを
1箇所に集めるためのファイルです。

### `docs/`

ブログの**運営側**のドキュメントです。サイトには公開されません（`src/pages/` の
外にあるのでビルド対象外）。記事として公開したい文章は `src/content/blog/` に置きます。

### `scripts/`

`npm run new-post -- <slug>` で記事のひな形を作れます。日付や必須項目の書き忘れを防ぐためのものです。

## URL 設計

| URL | 生成元 |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/blog` | `src/pages/blog/index.astro` |
| `/blog/page/2` | `src/pages/blog/page/[page].astro` |
| `/blog/<year>` | `src/pages/blog/[year]/index.astro` |
| `/blog/<year>/<month>` | `src/pages/blog/[year]/[month]/index.astro` |
| `/blog/<slug>` | `src/pages/blog/[...slug].astro` |
| `/outputs` | `src/pages/outputs/index.astro` |
| `/tags` | `src/pages/tags/index.astro` |
| `/tags/<tag>` | `src/pages/tags/[tag].astro` |
| `/about` | `src/pages/about.astro` |
| `/rss.xml` | `src/pages/rss.xml.ts` |

記事の URL は **`/blog/<slug>`**（年を含めない）に決めています。後から変えると
既存リンクが切れるので、変更する場合はリダイレクトの用意も一緒に検討してください。

### `base` について

GitHub Pages のプロジェクトページで公開するため、`astro.config.mjs` で
`base: '/my-blog'` を設定しています。この場合、**手書きの `href` には base が
自動では付きません**。リンクを書くときは `src/lib/format.ts` の `href()` を通してください。

```astro
---
import { href } from '@/lib/format';
---
<a href={href('/blog')}>Blog</a>
```

独自ドメインに移行する場合は `astro.config.mjs` の `site` を書き換えて `base` を
削除すれば、`href()` はそのまま何もしない関数として動き続けます。
