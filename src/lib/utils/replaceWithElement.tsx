import type { ReactNode } from 'react';

export const replaceWithElement = (
  str: string,
  target: string,
  With: ReactNode,
): ReactNode => {
  const targetRegex = new RegExp(target);

  const result: ReactNode[] = [];
  for (let match: null | RegExpMatchArray; (match = str.match(targetRegex)); ) {
    if (match === null || match.index === undefined) break;
    result.push(str.slice(0, match.index));
    result.push(With);
    str = str.slice(match.index + match[0].length);
  }

  result.push(str);

  return result;
};
