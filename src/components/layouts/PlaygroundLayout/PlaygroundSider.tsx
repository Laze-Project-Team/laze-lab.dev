import { css } from '@emotion/react';
import { Navbar } from '@mantine/core';
import type { FC } from 'react';

import { gray } from '@/styles/colors';

export const PresentialPlaygroundSider: FC = () => {
  return (
    <>
      <Navbar
        css={css`
          z-index: 5;
          width: 20vw;
          height: 100%;
          border-right: 1px solid ${gray[1]};
          box-shadow: 1px 0 2px 0.25px rgba(0, 0, 0, 0.06);
        `}
      >
        <div
          css={css`
            display: flex;
            height: 100%;
          `}
        >
          <div
            css={css`
              width: 60px;
              height: 100%;
              background-color: ${gray[1]};
            `}
          ></div>
        </div>
      </Navbar>
    </>
  );
};

export const PlaygroundSider: FC = () => {
  return <PresentialPlaygroundSider />;
};
