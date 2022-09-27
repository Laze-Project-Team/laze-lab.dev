import { css } from '@emotion/react';
import NextImage from 'next/image';
import type { FC } from 'react';

export const Image: FC<JSX.IntrinsicElements['img']> = ({ alt, ...props }) => (
  <div
    css={css`
      width: 100%;
      max-width: 40rem;
    `}
  >
    <NextImage alt={alt} layout="fill" objectFit="contain" {...props} />
  </div>
);
