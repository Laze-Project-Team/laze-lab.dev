import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { IndexLayout } from '.';

export default {
  title: 'layouts/IndexLayout',
  component: IndexLayout,
} as ComponentMeta<typeof IndexLayout>;

const Template: ComponentStory<typeof IndexLayout> = (args) => (
  <IndexLayout {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
