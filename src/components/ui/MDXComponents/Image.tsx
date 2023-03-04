import { css } from '@emotion/react';
import type { ImageProps } from 'next/image';
import NextImage from 'next/image';
import type { FC } from 'react';

export const Image: FC<ImageProps> = ({ src, placeholder: _, ...props }) => (
  <div
    css={css`
      width: 100%;
      max-width: 40rem;
    `}
  >
    {src && (
      <NextImage
        src={src}
        fill
        css={css`
          object-fit: contain;
        `}
        {...props}
      />
    )}
  </div>
);
