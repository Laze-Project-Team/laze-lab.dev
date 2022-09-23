import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { IndexFooter } from '.';

export default {
  title: 'models/IndexFooter',
  component: IndexFooter,
} as ComponentMeta<typeof IndexFooter>;

const Template: ComponentStory<typeof IndexFooter> = (args) => (
  <IndexFooter {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
