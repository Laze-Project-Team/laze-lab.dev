import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { contentsDir } from '@/lib/path';

type docMeta = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  content: string;
};

const isMeta = (data: Record<string, unknown>): data is docMeta['meta'] =>
  typeof data.title === 'string' && typeof data.description === 'string';

export const getDocBySlug = (slug: string): docMeta => {
  const fileContents = fs.readFileSync(path.join(contentsDir, slug), 'utf-8');
  const { content, data } = matter(fileContents);

  if (!isMeta(data)) {
    throw new Error(`missing title or description in "${slug}"`);
  }

  return { slug, meta: data, content };
};
