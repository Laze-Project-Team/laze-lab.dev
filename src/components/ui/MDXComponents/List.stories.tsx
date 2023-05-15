import type { Meta, StoryFn } from '@storybook/react';
import type { FC, ReactNode } from 'react';
import { match } from 'ts-pattern';

import { Li, Ol, Ul } from './List';

const List: FC<{ data: ReactNode[] } & { type: 'ul' | 'ol' }> = ({
  type,
  data,
}) => {
  const content = data.map((val, i) => <Li key={i}>{val}</Li>);
  return match(type)
    .with('ul', () => <Ul>{content}</Ul>)
    .with('ol', () => <Ol>{content}</Ol>)
    .exhaustive();
};

export default {
  title: 'ui/MDXComponents/List',
  component: List,
} as Meta<typeof List>;

const Template: StoryFn<typeof List> = (props) => <List {...props} />;

export const OrderedList = Template.bind({});
OrderedList.args = {
  type: 'ol',
  data: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
};
export const UnorderedList = Template.bind({});
UnorderedList.args = {
  type: 'ul',
  data: ['item 1', 'item 2', 'item 3', 'item 4', 'item 5'],
};
