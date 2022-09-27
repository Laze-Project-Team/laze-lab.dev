import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Paragraph } from './Paragraph';

export default {
  title: 'ui/MDXComponents/Paragraph',
  component: Paragraph,
} as ComponentMeta<typeof Paragraph>;

const Template: ComponentStory<typeof Paragraph> = (props) => (
  <Paragraph {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'This is paragraph',
};
