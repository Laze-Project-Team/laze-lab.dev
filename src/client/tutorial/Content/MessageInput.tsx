import { css } from '@emotion/react';
import { ActionIcon, Textarea } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';
import type { FC } from 'react';
import { useRef, useState } from 'react';

import { useChatScenario } from '@/client/tutorial/Content/useChatScenario';

export const MessageInput: FC = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [inputMessage, setInputMessage] = useState('');
  const { inputHandler, chatAction } = useChatScenario();

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (inputMessage === '') return;
          if (!chatAction.inputAvailable) return;

          inputHandler(inputMessage);
        }}
      >
        <Textarea
          disabled={!chatAction.inputAvailable}
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
              disabled={!chatAction.inputAvailable}
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
