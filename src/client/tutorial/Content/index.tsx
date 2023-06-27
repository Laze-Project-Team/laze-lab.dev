import { css } from '@emotion/react';
import { useMantineTheme } from '@mantine/core';
import { type FC, useEffect, useRef } from 'react';

import { ActionButtons } from '@/client/tutorial/Content/ActionButtons';
import { Messages } from '@/client/tutorial/Content/Messages';
import { useChatScenarioMessageHandler } from '@/client/tutorial/Content/useChatScenario';

import { MessageInput } from './MessageInput';

export const Content: FC = () => {
  useChatScenarioMessageHandler();

  const theme = useMantineTheme();

  const messageActionContainerRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messageActionContainer = messageActionContainerRef.current;
    const messagesContainer = messagesContainerRef.current;

    if (messageActionContainer === null || messagesContainer === null) return;

    const observer = new ResizeObserver(() => {
      const { height } = messageActionContainer.getBoundingClientRect();
      messagesContainer.style.paddingBottom = `${height}px`;
    });

    observer.observe(messageActionContainer);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      css={css`
        display: flex;
        width: calc(100vw - var(--mantine-navbar-width, 0px));
        height: 100%;
        flex: 1;
        flex-direction: column;
        padding: 1rem;
        margin: -1rem;

        @media screen and (max-width: ${theme.breakpoints.sm}) {
          width: 100vw;
        }

        @media screen and (max-width: ${theme.breakpoints.xs}) {
          padding-right: 0;
          padding-left: 0;
        }
      `}
    >
      <div
        css={css`
          min-height: 0;
          flex: 1;
        `}
        ref={messagesContainerRef}
      >
        <Messages />
      </div>

      <div
        ref={messageActionContainerRef}
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
        <ActionButtons />
        <MessageInput />
      </div>
    </div>
  );
};
