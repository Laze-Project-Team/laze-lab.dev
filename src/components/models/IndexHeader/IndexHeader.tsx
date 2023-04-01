import { css } from '@emotion/react';
import type { FC } from 'react';

import { LazeLogo } from '@/components/ui/LazeLogo';
import { gray } from '@/styles/colors';

export const PresentialIndexHeader: FC = () => {
  return (
    <>
      <header
        css={css`
          padding: 8px 16px;
          box-shadow: ${gray[3]} 0 0 5px 0;
        `}
      >
        <div
          css={css`
            max-width: 1200px;
            margin: 0 auto;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 4px;
            `}
          >
            <LazeLogo option="logo" alt="" size={30}></LazeLogo>
            <span
              css={css`
                color: var(--color-laze-primary);
                font-size: 1.5rem;
              `}
            >
              LazeLab
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export const IndexHeader: FC = () => {
  return <PresentialIndexHeader />;
};
