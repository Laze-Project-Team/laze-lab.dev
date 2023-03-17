import { css } from '@emotion/react';
import NextImage from 'next/image';
import type { DetailedHTMLProps, FC, ImgHTMLAttributes } from 'react';

export const Image: FC<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
> = ({ src, placeholder: _, alt, width, height }) => (
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
        alt={alt ?? ''}
        width={Number(width)}
        height={Number(height)}
      />
    )}
  </div>
);
