import { css } from '@emotion/react';
import type { FC } from 'react';

import { useColorMode } from '@/components/contexts/ColorModeContext';

const listStyle = css`
  padding: 0 0 0 2rem;
  margin: 0.25rem;
  font-size: 0.9rem;
`;

export const Ul: FC<JSX.IntrinsicElements['ul']> = ({ children }) => (
  <ul css={listStyle}>{children}</ul>
);

export const Ol: FC<JSX.IntrinsicElements['ol']> = ({ children }) => (
  <ol css={listStyle}>{children}</ol>
);

export const Li: FC<JSX.IntrinsicElements['li']> = ({ children }) => {
  const { themePattern } = useColorMode();
  const color = themePattern('rgba(0, 0, 0, 0.87)', 'rgb(189, 189, 189)');

  return (
    <li
      css={css`
        padding: 0.25rem 0;
        color: ${color};
      `}
    >
      {children}
    </li>
  );
};
