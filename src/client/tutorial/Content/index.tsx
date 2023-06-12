import { css } from '@emotion/react';
import { useMantineTheme } from '@mantine/core';
import type { FC } from 'react';

import { Messages } from '@/client/tutorial/Content/Messages';

import { MessageInput } from './MessageInput';

export const Content: FC = () => {
  const theme = useMantineTheme();

  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 100%;
        flex: 1;
        flex-direction: column;
        padding: 1rem;
        margin: -1rem;
      `}
    >
      <Messages />

      <div
        css={css`
          position: fixed;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: ${theme.white};

          @media (min-width: ${theme.breakpoints.sm}) {
            left: var(--mantine-navbar-width, 0);
          }
        `}
      >
        <MessageInput />
      </div>
    </div>
  );
};
