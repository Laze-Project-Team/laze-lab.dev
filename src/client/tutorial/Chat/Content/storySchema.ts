import type {
  TutorialScenarioAutoReply,
  TutorialScenarioMessage,
  TutorialScenarioReply,
  TutorialScenarioStep,
} from '@/client/tutorial/Chat/Content/tutorialScenarioScheme';

export type Story = TextStory | ImageStory;

export type StoryBase = {
  id: string;
  from: 'user' | 'assistant';
};

export type TextStory = {
  type: 'text';
  content: string;
} & StoryBase;

export type ImageStory = {
  type: 'image';
  url: string;
} & StoryBase;

export const stepToStory = <T extends TutorialScenarioStep>(
  id: string,
  step: T,
  action: T extends TutorialScenarioMessage
    ? ''
    : T extends TutorialScenarioAutoReply
    ? ''
    : string,
): Story => {
  if (step.type === 'message') {
    return messageStepToStory(id, step);
  }

  return replyStepToStory(id, step, action);
};

export const messageStepToStory = (
  id: string,
  step: TutorialScenarioMessage,
): Story => {
  if (step.messageType === 'image') {
    return {
      id,
      from: 'assistant',
      type: 'image',
      url: step.url,
    };
  }

  return {
    id,
    from: 'assistant',
    type: 'text',
    content: step.text,
  };
};

export const replyStepToStory = <T extends TutorialScenarioReply>(
  id: string,
  step: T,
  actionContent: T extends TutorialScenarioAutoReply ? '' : string,
): Story => {
  if (step.replyType === 'auto') {
    return {
      id,
      from: 'user',
      type: 'text',
      content: step.content,
    };
  }

  if (step.replyType === 'select') {
    return {
      id,
      from: 'user',
      type: 'text',
      content: actionContent,
    };
  }

  return {
    id,
    from: 'user',
    type: 'text',
    content: actionContent,
  };
};
