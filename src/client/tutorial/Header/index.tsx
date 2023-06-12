import { css } from '@emotion/react';
import type { FC } from 'react';

export const Header: FC = () => {
  return (
    <div>
      <div
        css={css`
          padding: 0.5rem 1rem;
          box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
        `}
      >
        <h1
          css={css`
            font-size: 1rem;
          `}
        >
          チュートリアル
        </h1>
      </div>
    </div>
  );
};
