import type { UrlObject } from 'url';

const isInternalHrefString = (href: string): boolean =>
  href.startsWith('/') || href.startsWith('#');

export const isInternalLink = (href: UrlObject | string): boolean => {
  if (typeof href === 'string') {
    return isInternalHrefString(href);
  } else {
    const pathname = href.pathname;

    // if null/undefined
    if (pathname == undefined) return false;

    return isInternalHrefString(pathname);
  }
};
