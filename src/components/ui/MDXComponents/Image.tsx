import { css } from '@emotion/react';
import NextImage from 'next/image';
import type { FC } from 'react';

export const Image: FC<JSX.IntrinsicElements['img']> = ({
  src,
  placeholder: _,
  alt,
  ...props
}) => (
  <div
    css={css`
      width: 100%;
      max-width: 40rem;
    `}
  >
    {src && (
      <NextImage
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        {...props}
      />
    )}
  </div>
);
