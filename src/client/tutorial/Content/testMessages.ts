import type { TutorialScenario } from '@/client/tutorial/Content/tutorialScenarioScheme';
import type { ChatMessage } from '@/client/tutorial/Content/useChatMessages';

export const scenario: TutorialScenario = {
  start: {
    type: 'message',
    messageType: 'text',
    text: 'やあ、助手くん。今日はプログラミングについて学んでいこう。さっそくだけど、プログラミングって何だと思う？',
    nextStepId: '1',
  },
  '1': {
    type: 'reply',
    replyType: 'auto',
    content: 'そうだなぁ、、、コンピュータと遊ぶことですか？',
    nextStepId: '2',
  },
  '2': {
    type: 'message',
    messageType: 'text',
    text: '遊ぶっていうよりは、コンピュータに何かしら命令を与えて、自分のやりたいことをコンピュータにやってもらうっていう作業かな。',
    nextStepId: '3',
  },
  '3': {
    type: 'message',
    messageType: 'text',
    text: 'プログラミング言語って何かわかる？',
    nextStepId: '4',
  },
  '4': {
    type: 'reply',
    replyType: 'auto',
    content: 'コンピュータとお話するための言葉みたいなものですか？',
    nextStepId: '5',
  },
  '5': {
    type: 'message',
    messageType: 'text',
    text: 'お、助手くん鋭いねー',
    nextStepId: '6',
  },
  '6': {
    type: 'message',
    messageType: 'text',
    text: 'プログラミング言語っていうのは、人間がコンピュータに命令を伝えるためのツールなんだよ。例えば、PythonやJavaScriptとかがあるね。',
    nextStepId: '7',
  },
  '7': {
    type: 'message',
    messageType: 'text',
    text: 'プログラミング言語を使って、コードを書くことでコンピュータが理解できる形で命令を伝えることができるんだ！',
    nextStepId: '8',
  },
  '8': {
    type: 'reply',
    replyType: 'auto',
    content:
      'そうなんですね。じゃあプログラミングって、どんなことができるんですか？',
    nextStepId: '9',
  },
  '9': {
    type: 'message',
    messageType: 'text',
    text: 'さっきも言ったけどプログラミングは色々なことができるんだ！',
    nextStepId: '10',
  },
  '10': {
    type: 'message',
    messageType: 'text',
    text: '例えば、ウェブサイトやアプリの開発、ゲームの制作、データ解析、AIの開発など、さまざまな分野で活躍しているね。',
    nextStepId: '11',
  },
  '11': {
    type: 'message',
    messageType: 'text',
    text: 'プログラミングの基本っていうのは、変数やループ、条件分岐、関数などを使って、コンピュータにどのように命令を与えるかってことなんだよ。',
    nextStepId: '12',
  },
  '12': {
    type: 'reply',
    replyType: 'auto',
    content: 'プログラミングってすごいですね！',
    nextStepId: '13',
  },
  '13': {
    type: 'reply',
    replyType: 'auto',
    content:
      'でも、そんな難しそうなことがボクにもできるのか心配になってきました。変数？条件分岐？全然聞いたことのない言葉ばかりです。',
    nextStepId: '14',
  },
  '14': {
    type: 'message',
    messageType: 'text',
    text: '大丈夫だよ、助手くん。最初の方は難しく感じるかもしれないけど、練習すれば誰でもできるようになるものだから。',
    nextStepId: '15',
  },
  '15': {
    type: 'message',
    messageType: 'text',
    text: 'LazeLabを使ってプログラミングを学べば誰でも1人前のプログラマーになれちゃうぞ！',
    nextStepId: '16',
  },
  '16': {
    type: 'reply',
    replyType: 'auto',
    content: 'ホントですか！なんだかボクにもできるような気がしてきました！',
    nextStepId: '17',
  },
  '17': {
    type: 'message',
    messageType: 'text',
    text: 'いいね！これから私と一緒に頑張っていこう！',
    nextStepId: '18',
  },
  '18': {
    type: 'reply',
    replyType: 'text',
    nextStepId: '19',
  },
  '19': {
    type: 'reply',
    replyType: 'select',
    options: [
      {
        text: '(終わり)',
        nextStepId: 'end',
      },
      {
        text: '(もう一度)',
        nextStepId: 'start',
      },
    ],
  },
};

export const messages: ChatMessage[] = [
  {
    type: 'text',
    author: 'hakase',
    text: 'やあ、助手くん。今日はプログラミングについて学んでいこう。さっそくだけど、プログラミングって何だと思う？',
  },
  {
    type: 'text',
    author: 'josyu',
    text: 'そうだなぁ、、、コンピュータと遊ぶことですか？',
  },
  {
    type: 'text',
    author: 'hakase',
    text: '遊ぶっていうよりは、コンピュータに何かしら命令を与えて、自分のやりたいことをコンピュータにやってもらうっていう作業かな。',
  },
  {
    type: 'text',
    author: 'hakase',
    text: 'プログラミング言語って何かわかる？',
  },
  {
    type: 'text',
    author: 'josyu',
    text: 'コンピュータとお話するための言葉みたいなものですか？',
  },
  {
    type: 'text',
    author: 'hakase',
    text: 'お、助手くん鋭いねー',
  },
  {
    type: 'text',
    author: 'hakase',
    text: 'プログラミング言語っていうのは、人間がコンピュータに命令を伝えるためのツールなんだよ。例えば、PythonやJavaScriptとかがあるね。',
  },
  {
    type: 'text',
    author: 'hakase',
    text: 'プログラミング言語を使って、コードを書くことでコンピュータが理解できる形で命令を伝えることができるんだ！',
  },
  {
    type: 'text',
    author: 'josyu',
    text: 'そうなんですね。じゃあプログラミングって、どんなことができるんですか？',
  },
  {
    type: 'text',
    author: 'hakase',
    text: 'さっきも言ったけどプログラミングは色々なことができるんだ！',
  },
  {
    type: 'text',
    author: 'hakase',
    text: '例えば、ウェブサイトやアプリの開発、ゲームの制作、データ解析、AIの開発など、さまざまな分野で活躍しているね。',
  },
  {
    type: 'text',
    author: 'hakase',
    text: 'プログラミングの基本っていうのは、変数やループ、条件分岐、関数などを使って、コンピュータにどのように命令を与えるかってことなんだよ。',
  },
  {
    type: 'text',
    author: 'josyu',
    text: 'プログラミングってすごいですね！',
  },
  {
    type: 'text',
    author: 'josyu',
    text: 'でも、そんな難しそうなことがボクにもできるのか心配になってきました。変数？条件分岐？全然聞いたことのない言葉ばかりです。',
  },
  {
    type: 'text',
    author: 'hakase',
    text: '大丈夫だよ、助手くん。最初の方は難しく感じるかもしれないけど、練習すれば誰でもできるようになるものだから。',
  },
  {
    type: 'text',
    author: 'hakase',
    text: 'LazeLabを使ってプログラミングを学べば誰でも1人前のプログラマーになれちゃうぞ！',
  },
  {
    type: 'text',
    author: 'josyu',
    text: 'ホントですか！なんだかボクにもできるような気がしてきました！',
  },
  {
    type: 'text',
    author: 'hakase',
    text: 'いいね！これから私と一緒に頑張っていこう！',
  },
];
