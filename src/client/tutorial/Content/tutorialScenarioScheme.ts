export type TutorialScenario = Record<string, TutorialScenarioStep>;

export type TutorialScenarioStep =
  | TutorialScenarioMessage
  | TutorialScenarioReply;

export type TutorialScenarioMessageBase = {
  type: 'message';
  nextStepId: string;
};

export type TutorialScenarioMessage =
  | TutorialScenarioTextMessage
  | TutorialScenarioImageMessage;

export type TutorialScenarioTextMessage = {
  messageType: 'text';
  text: string;
} & TutorialScenarioMessageBase;

export type TutorialScenarioImageMessage = {
  messageType: 'image';
  url: string;
} & TutorialScenarioMessageBase;

export type TutorialScenarioReplyBase = {
  type: 'reply';
};

export type TutorialScenarioReply =
  | TutorialScenarioSelectReply
  | TutorialScenarioAutoReply
  | TutorialScenarioTextReply;

export type TutorialScenarioSelectReply = {
  replyType: 'select';
  options: TutorialScenarioReplyOption[];
} & TutorialScenarioReplyBase;

export type TutorialScenarioAutoReply = {
  replyType: 'auto';
  content: string;
  nextStepId: string;
} & TutorialScenarioReplyBase;

export type TutorialScenarioReplyOption = {
  text: string;
  nextStepId: string;
};

export type TutorialScenarioTextReply = {
  replyType: 'text';
  nextStepId: string;
} & TutorialScenarioReplyBase;
