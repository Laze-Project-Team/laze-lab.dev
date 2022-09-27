import { css } from '@emotion/react';
import type { FC } from 'react';

const listStyle = css`
  padding: 0 0 0 1rem;
`;

export const Ul: FC<JSX.IntrinsicElements['ul']> = ({ children }) => (
  <ul css={listStyle}>{children}</ul>
);

export const Ol: FC<JSX.IntrinsicElements['ol']> = ({ children }) => (
  <ol css={listStyle}>{children}</ol>
);

export const Li: FC<JSX.IntrinsicElements['li']> = ({ children }) => (
  <li
    css={css`
      padding: 0.25rem 0;
    `}
  >
    {children}
  </li>
);
