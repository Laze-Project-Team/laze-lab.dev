import { css } from '@emotion/react';
import { Button, Flex } from '@mantine/core';
import type { FC } from 'react';

import {
  type ScenarioUserAction,
  useChatScenario,
} from '@/client/tutorial/Content/useChatScenario';

export type PresentialActionButtonsProps = {
  actions: ScenarioUserAction[];
};

export const PresentialActionButtons: FC<PresentialActionButtonsProps> = ({
  actions,
}) => {
  return (
    <Flex
      p="md"
      gap="sm"
      w="100%"
      css={css`
        .mantine-Button-root {
          height: auto;
          padding: 0.5rem 1rem;
        }

        & .mantine-Button-label {
          line-height: 1.25;
          white-space: normal;
        }
      `}
    >
      {actions.map((action, index) => (
        <Button variant="outline" onClick={action.actionHandler} key={index}>
          {action.text}
        </Button>
      ))}
    </Flex>
  );
};

export const ActionButtons: FC = () => {
  const { chatAction } = useChatScenario();

  if (chatAction.actions.length === 0) {
    return null;
  }

  return <PresentialActionButtons actions={chatAction.actions} />;
};
