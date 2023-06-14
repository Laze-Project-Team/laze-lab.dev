import { css } from '@emotion/react';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';

import { Message } from '@/client/tutorial/Content/Message';
import { useChatScenario } from '@/client/tutorial/Content/useChatScenario';

export const Messages: FC = (props) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { chatStories } = useChatScenario();

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, [chatStories]);

  return (
    <div
      ref={messagesContainerRef}
      css={css`
        display: flex;
        flex-direction: column;
        padding: 1rem;
        gap: 3rem;
      `}
      {...props}
    >
      {chatStories.map((story, index) => (
        <Message key={index} story={story} />
      ))}
    </div>
  );
};
