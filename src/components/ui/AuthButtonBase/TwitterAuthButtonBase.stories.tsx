import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { TwitterAuthButtonBase } from './TwitterAuthButtonBase';

export default {
  title: 'models/AuthButtonBase/TwitterAuthButtonBase',
  component: TwitterAuthButtonBase,
} as ComponentMeta<typeof TwitterAuthButtonBase>;

const Template: ComponentStory<typeof TwitterAuthButtonBase> = (props) => (
  <TwitterAuthButtonBase {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Auth with Twitter',
};
