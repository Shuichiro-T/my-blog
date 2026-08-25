import type { APIRoute, GetStaticPaths } from 'astro';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { AUTHOR, SITE_TITLE } from '@/consts';
import { getPublishedPosts } from '@/lib/posts';

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const root = process.cwd();
const fontData = fs.readFileSync(path.join(root, 'src/assets/fonts/NotoSansJP-Bold.woff'));

const faviconSvg = fs.readFileSync(path.join(root, 'public/favicon.svg'));
const faviconResvg = new Resvg(faviconSvg, { fitTo: { mode: 'width', value: 80 } });
const faviconPng = faviconResvg.render().asPng();
const faviconDataUri = `data:image/png;base64,${Buffer.from(faviconPng).toString('base64')}`;

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    params: { slug: post.id },
    props: {
      title: post.data.title,
      tags: post.data.tags,
      pubDate: post.data.pubDate,
    },
  }));
};

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}.${m}.${d}`;
}

export const GET: APIRoute = async ({ props }) => {
  const { title, tags, pubDate } = props as {
    title: string;
    tags: string[];
    pubDate: Date;
  };

  const tagBadges = tags.map((tag) => ({
    type: 'div',
    props: {
      style: {
        fontSize: '22px',
        color: '#4d4d4d',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        padding: '4px 14px',
      },
      children: `#${tag}`,
    },
  }));

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#4d4d4d',
          padding: '40px',
        },
        children: {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: '100%',
              height: '100%',
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '48px',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'flex-end',
                  },
                  children: {
                    type: 'div',
                    props: {
                      style: {
                        fontSize: '24px',
                        color: '#888',
                      },
                      children: SITE_TITLE,
                    },
                  },
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '76px',
                    fontWeight: 700,
                    color: '#1a1a2e',
                    lineHeight: 1.3,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  },
                  children: title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        },
                        children: [
                          ...tagBadges,
                          {
                            type: 'div',
                            props: {
                              style: {
                                fontSize: '22px',
                                color: '#888',
                              },
                              children: formatDate(pubDate),
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                        },
                        children: [
                          {
                            type: 'img',
                            props: {
                              src: faviconDataUri,
                              width: 48,
                              height: 48,
                              style: { borderRadius: '50%' },
                            },
                          },
                          {
                            type: 'div',
                            props: {
                              style: {
                                fontSize: '24px',
                                color: '#555',
                              },
                              children: `${AUTHOR} / @shucho0103`,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      },
    },
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          weight: 700,
          style: 'normal' as const,
        },
      ],
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: OG_WIDTH },
  });
  const png = resvg.render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
};
