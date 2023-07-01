import { atom, useAtom } from 'jotai';

export type ChatMessageBase = {
  author: 'hakase' | 'josyu';
};

export type ChatMessageText = ChatMessageBase & {
  type: 'text';
  text: string;
};

export type ChatMessageImage = ChatMessageBase & {
  type: 'image';
  url: string;
};

export type ChatMessage = ChatMessageText | ChatMessageImage;

const chatMessagesAtom = atom<ChatMessage[]>([]);

type useChatMessagesType = {
  chatMessages: ChatMessage[];
  postMessage: (message: ChatMessage) => void;
};

export const useChatMessages = (): useChatMessagesType => {
  const [chatMessages, setChatMessages] = useAtom(chatMessagesAtom);

  const postMessage = (message: ChatMessage) => {
    setChatMessages([...chatMessages, message]);
  };

  return { chatMessages, postMessage };
};
