import { css } from '@emotion/react';
import type { FC } from 'react';

import { gray } from '@/styles/colors';

export const PresentialPlaygroundHeader: FC = () => {
  return (
    <>
      <div
        css={css`
          z-index: 10;
          display: flex;
          height: 40px;
          border-bottom: 1px solid ${gray[1]};
          background-color: white;
          box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.06);
        `}
      ></div>
    </>
  );
};

export const PlaygroundHeader: FC = () => {
  return <PresentialPlaygroundHeader />;
};
