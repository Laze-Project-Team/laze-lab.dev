import type { Meta, StoryFn } from '@storybook/react';

import { Paragraph } from './Paragraph';

export default {
  title: 'ui/MDXComponents/Paragraph',
  component: Paragraph,
} as Meta<typeof Paragraph>;

const Template: StoryFn<typeof Paragraph> = (props) => <Paragraph {...props} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'This is paragraph',
};
