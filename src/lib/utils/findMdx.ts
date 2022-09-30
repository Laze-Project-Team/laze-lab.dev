import fs from 'fs';
import path from 'path';

import { contentsDir } from '@/lib/path';
import { excludeNull } from '@/lib/utils/excludeNull';
import type { localeId } from '@/lib/utils/isLocale';
import { isLocale } from '@/lib/utils/isLocale';

const getFullPath = (pathname: string) => path.join(contentsDir, pathname);

type mdxType = {
  params: {
    path: string;
  };
  locale: localeId;
};

export const findMdx = (pathname: string): mdxType[] => {
  const dirents = fs.readdirSync(getFullPath(pathname), {
    withFileTypes: true,
  });
  const paths = excludeNull(
    dirents.map((dirent) => {
      if (!dirent.isFile()) return;
      if (!dirent.name.endsWith('.mdx')) return;

      const match = dirent.name.match(/([^.]*).([^.]*).mdx/);
      if (match === null) {
        throw new Error(
          `locale is not specified at "${path.join(pathname, dirent.name)}"`,
        );
      }

      const name = match[1];
      const locale = match[2];
      if (!isLocale(locale)) {
        throw new Error(
          `locale at "${path.join(pathname, dirent.name)}" is not valid`,
        );
      }

      const mdx: mdxType = {
        params: { path: name },
        locale,
      };

      return mdx;
    }),
  );

  return paths;
};

export const findMdxRecursively = (pathname: string): mdxType[] => {
  const dirents = fs.readdirSync(getFullPath(pathname), {
    withFileTypes: true,
  });

  const paths = excludeNull(
    dirents.flatMap((dirent) => {
      if (!dirent.isDirectory()) return;

      return findMdx(path.join(pathname, dirent.name));
    }),
  );

  return findMdx(pathname).concat(paths);
};
