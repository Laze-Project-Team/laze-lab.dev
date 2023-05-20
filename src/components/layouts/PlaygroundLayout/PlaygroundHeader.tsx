import { css } from '@emotion/react';
import { Button } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import { LazeLogo } from '@/components/ui/LazeLogo';
import { gray } from '@/styles/colors';

export const PresentialPlaygroundHeader: FC = () => {
  const router = useRouter();
  return (
    <>
      <div
        css={css`
          position: static;
          z-index: 10;
          display: flex;
          height: 40px;
          border-bottom: 1px solid ${gray[1]};
          background-color: white;
          box-shadow: 0 1px 4px 0.5px rgba(0, 0, 0, 0.06);
        `}
      >
        <Button
          css={css`
            width: 60px;
            height: 100%;
            border-radius: 0;
          `}
          color="blue"
        >
          <IconMenu2 />
        </Button>
        <Button
          css={css`
            display: flex;
            width: calc(20vw - 62px);
            height: 100%;
            align-items: center;
            justify-content: center;
            border: 0;
            border-radius: 0;
            border-right: 1px solid ${gray[1]};
            margin: 0;
            background-color: white;
            gap: 4px;
            transition: 0.2s;

            &:hover {
              background-color: ${gray[2]} !important;
            }

            &:active {
              background-color: ${gray[4]} !important;
              transform: translateY(0);
            }
          `}
          onClick={() => {
            router.push('/');
          }}
        >
          <LazeLogo option="logo" alt="" size={25}></LazeLogo>
          <span
            css={css`
              margin-left: 4px;
              color: var(--color-laze-primary);
              font-size: 1.4rem;
              font-weight: 400;
            `}
          >
            LazeLab
          </span>
        </Button>
      </div>
    </>
  );
};

export const PlaygroundHeader: FC = () => {
  return <PresentialPlaygroundHeader />;
};
