import { css } from '@emotion/react';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import { Message } from '@/client/tutorial/Content/Message';
import { PostNextMessageButton } from '@/client/tutorial/Content/PostNextMessageButton';
import { useChatMessages } from '@/client/tutorial/Content/useChatMessages';

export const Messages: FC = () => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { chatMessages } = useChatMessages();

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatMessages]);

  return (
    <div
      ref={messagesContainerRef}
      css={css`
        display: flex;
        min-height: 0;
        flex: 1;
        flex-direction: column;
        padding: 1rem;
        padding-bottom: 6rem;
        gap: 3rem;
      `}
    >
      {chatMessages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <PostNextMessageButton />
    </div>
  );
};
