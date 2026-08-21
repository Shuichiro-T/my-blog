#!/usr/bin/env node
/**
 * 記事のひな形を作るスクリプト。
 *
 *   npm run new-post -- hello-astro
 *   npm run new-post -- hello-astro --title "Astro で始めるブログ"
 *
 * src/content/blog/<年>/<slug>/index.md を作成する。
 */
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const args = process.argv.slice(2);
const slug = args.find((arg) => !arg.startsWith('--'));

if (!slug) {
  console.error('使い方: npm run new-post -- <slug> [--title "タイトル"]');
  process.exit(1);
}

if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
  console.error(
    `slug "${slug}" は英小文字・数字・ハイフンのみで指定してください（例: hello-astro）。`,
  );
  process.exit(1);
}

const titleIndex = args.indexOf('--title');
const title = titleIndex !== -1 ? args[titleIndex + 1] : slug;

const now = new Date();
const pubDate = now.toISOString().slice(0, 10);
const dir = join('src', 'content', 'blog', String(now.getFullYear()), slug);
const file = join(dir, 'index.md');

try {
  await access(file);
  console.error(`${file} はすでに存在します。`);
  process.exit(1);
} catch {
  // 存在しないので作成に進む
}

const template = `---
title: '${title.replace(/'/g, "''")}'
description: ''
pubDate: ${pubDate}
tags: []
draft: true
---

ここに本文を書きます。
`;

await mkdir(dir, { recursive: true });
await writeFile(file, template, 'utf8');

console.log(`作成しました: ${file}`);
console.log(`URL: /blog/${slug}`);
console.log('公開するときは draft を false にしてください。');
