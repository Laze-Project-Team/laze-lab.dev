import {
  IconAlphabetLatin,
  IconBooks,
  IconCategory,
  IconHistory,
  IconMessageLanguage,
  IconQuestionMark,
  IconSchool,
  IconStairsUp,
  IconVideo,
  IconVocabulary,
  IconWand,
  IconWorld,
} from '@tabler/icons-react';
import type { FC } from 'react';

import type { NavigationLink } from './Navigation';
import { Navigation as NavigationComponent } from './Navigation';

const navigationLinks: NavigationLink[] = [
  {
    label: 'プログラミングとは',
    href: '/tutorial/programming',
    icon: IconQuestionMark,
  },
  {
    label: 'プログラミング言語',
    href: '/tutorial/programming-language',
    icon: IconAlphabetLatin,
  },
  {
    label: 'プログラミングの歴史',
    href: '/tutorial/programming-history',
    icon: IconHistory,
  },
  {
    label: 'プログラミングの種類',
    href: '/tutorial/programming-type',
    icon: IconCategory,
  },
  {
    label: 'プログラミングの用途',
    href: '/tutorial/programming-purpose',
    icon: IconWand,
  },
  {
    label: 'プログラミングの学習',
    href: '/tutorial/programming-learning',
    icon: IconVocabulary,
  },
  {
    label: 'プログラミングの学習方法',
    href: '/tutorial/programming-learning-method',
    icon: IconStairsUp,
  },
  {
    label: 'プログラミングの学習サイト',
    href: '/tutorial/programming-learning-site',
    icon: IconWorld,
  },
  {
    label: 'プログラミングの学習言語',
    href: '/tutorial/programming-learning-language',
    icon: IconMessageLanguage,
  },
  {
    label: 'プログラミングの学習本',
    href: '/tutorial/programming-learning-book',
    icon: IconBooks,
  },
  {
    label: 'プログラミングの学習動画',
    href: '/tutorial/programming-learning-video',
    icon: IconVideo,
  },
  {
    label: 'プログラミングの学習スクール',
    href: '/tutorial/programming-learning-school',
    icon: IconSchool,
  },
];

export const Navigation: FC = () => {
  return <NavigationComponent links={navigationLinks} />;
};
