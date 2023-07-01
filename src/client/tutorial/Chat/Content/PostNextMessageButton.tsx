import { css } from '@emotion/react';
import { Button } from '@mantine/core';
import type { FC } from 'react';
import { useCallback } from 'react';

import { messages } from '@/client/tutorial/Chat/Content/testMessages';
import { useChatMessages } from '@/client/tutorial/Chat/Content/useChatMessages';

export const PostNextMessageButton: FC = () => {
  const { postMessage } = useChatMessages();

  const postNextMessage = useCallback(() => {
    const nextMessage = messages.shift();
    if (nextMessage === undefined) return;
    messages.push(nextMessage);

    postMessage(nextMessage);
  }, [postMessage]);

  return (
    <>
      <Button
        variant="light"
        onClick={postNextMessage}
        css={css`
          height: 32px;
          flex-shrink: 0;
        `}
      >
        ▼
      </Button>
    </>
  );
};
