import { css } from '@emotion/react';
import { Popover, Text } from '@mantine/core';
import { atom, useAtom } from 'jotai';
import type { FC, ReactNode } from 'react';

import { useChatScenario } from '@/client/tutorial/Chat/Content/useChatScenario';

export const isMessageInputFocusedAtom = atom(false);

type MessagePopoverProps = {
  children: ReactNode;
};

export const MessagePopover: FC<MessagePopoverProps> = ({ children }) => {
  const { chatAction } = useChatScenario();
  const [isMessageInputFocused] = useAtom(isMessageInputFocusedAtom);

  return (
    <Popover
      width={240}
      position="top"
      withArrow
      shadow="md"
      opened={chatAction.inputAvailable && !isMessageInputFocused}
      transitionProps={{ transition: 'pop-bottom-left' }}
    >
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown
        css={css`
          top: -56px !important;
          margin-left: 1rem;
        `}
      >
        <Text size="sm">メッセージを入力してください</Text>
      </Popover.Dropdown>
    </Popover>
  );
};
