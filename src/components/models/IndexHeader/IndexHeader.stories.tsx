import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { IndexHeader } from '.';

export default {
  title: 'models/IndexHeader',
  component: IndexHeader,
} as ComponentMeta<typeof IndexHeader>;

const Template: ComponentStory<typeof IndexHeader> = (args) => (
  <IndexHeader {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
