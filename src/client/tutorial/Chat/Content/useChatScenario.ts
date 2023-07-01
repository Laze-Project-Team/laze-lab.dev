import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

import {
  stepToStory,
  type Story,
} from '@/client/tutorial/Chat/Content/storySchema';
import { scenario } from '@/client/tutorial/Chat/Content/testMessages';

export type ScenarioAction = {
  inputAvailable?: boolean;
  actions: ScenarioUserAction[];
};

export type ScenarioUserAction = {
  text: string;
  actionHandler: () => void;
};

export type UseChatScenario = {
  currentMessageId: string;
  chatStories: Story[];
  chatAction: ScenarioAction;
  inputHandler: (text: string) => void;
};

const currentMessageIdAtom = atom<string>('start');
const chatStoriesAtom = atom<Story[]>([]);

export const useChatScenario = (): UseChatScenario => {
  const [currentMessageId, setCurrentMessageId] = useAtom(currentMessageIdAtom);
  const [chatStories, setChatStories] = useAtom(chatStoriesAtom);

  const currentMessage = scenario[currentMessageId];

  const chatAction: ScenarioAction = (() => {
    if (!currentMessage) return { inputAvailable: false, actions: [] };

    if (currentMessage.type === 'message') {
      return {
        inputAvailable: false,
        actions: [],
      };
    }

    if (currentMessage.replyType === 'select') {
      return {
        inputAvailable: false,
        actions: currentMessage.options.map((option) => ({
          actionHandler: () => {
            setCurrentMessageId(option.nextStepId);
            setChatStories((prevStory) => [
              ...prevStory,
              stepToStory(currentMessageId, currentMessage, option.text),
            ]);
          },
          text: option.text,
        })),
      };
    }

    if (currentMessage.replyType === 'auto') {
      return {
        inputAvailable: false,
        actions: [
          {
            text: currentMessage.content,
            actionHandler: () => {
              setCurrentMessageId(currentMessage.nextStepId);
              setChatStories((prevStory) => [
                ...prevStory,
                stepToStory(currentMessageId, currentMessage, ''),
              ]);
            },
          },
        ],
      };
    }

    if (currentMessage.replyType === 'text') {
      return {
        inputAvailable: true,
        actions: [],
      };
    }

    const _: never = currentMessage;
    return _;
  })();

  const inputHandler = (text: string) => {
    if (currentMessage.type !== 'reply') return;
    if (currentMessage.replyType !== 'text') return;

    setCurrentMessageId(currentMessage.nextStepId);
    setChatStories((prevStory) => [
      ...prevStory,
      stepToStory(currentMessageId, currentMessage, text),
    ]);
  };

  return {
    currentMessageId,
    chatStories,
    chatAction,
    inputHandler,
  };
};

export const useChatScenarioMessageHandler = (): void => {
  const [currentMessageId, setCurrentMessageId] = useAtom(currentMessageIdAtom);
  const [, setChatStories] = useAtom(chatStoriesAtom);

  const currentMessage = scenario[currentMessageId];

  useEffect(() => {
    if (!currentMessage) return;
    if (currentMessage.type !== 'message') return;

    const timeout = setTimeout(() => {
      setCurrentMessageId(currentMessage.nextStepId);
      setChatStories((prevStory) => [
        ...prevStory,
        stepToStory(currentMessageId, currentMessage, ''),
      ]);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentMessage, currentMessageId, setChatStories, setCurrentMessageId]);
};
