import { css } from '@emotion/react';
import { ActionIcon, Textarea } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import type { FC } from 'react';
import { useRef, useState } from 'react';

import { useChatMessages } from '@/client/tutorial/Content/useChatMessages';

export const MessageInput: FC = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [inputMessage, setInputMessage] = useState('');
  const { postMessage } = useChatMessages();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputMessage === '') return;

          postMessage({ author: 'josyu', type: 'text', text: inputMessage });
        }}
      >
        <Textarea
          variant="unstyled"
          placeholder="ここにメッセージを入力"
          css={css`
            border-top: 1px solid #eee;

            & textarea {
              padding: 0.5rem 2rem 0.5rem 1rem;
            }
          `}
          autosize
          value={inputMessage}
          onChange={(e) => setInputMessage(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              submitButtonRef.current?.click();
              e.preventDefault();
              setInputMessage('');
              return;
            }
          }}
          minRows={1}
          maxRows={4}
          rightSection={
            <ActionIcon
              size="md"
              variant="subtle"
              type="submit"
              ref={submitButtonRef}
            >
              <IconSend size="1.125rem" />
            </ActionIcon>
          }
        />
      </form>
    </div>
  );
};
