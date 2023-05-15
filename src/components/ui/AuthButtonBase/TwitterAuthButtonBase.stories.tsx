import type { Meta, StoryFn } from '@storybook/react';

import { TwitterAuthButtonBase } from './TwitterAuthButtonBase';

export default {
  title: 'models/AuthButtonBase/TwitterAuthButtonBase',
  component: TwitterAuthButtonBase,
} as Meta<typeof TwitterAuthButtonBase>;

const Template: StoryFn<typeof TwitterAuthButtonBase> = (props) => (
  <TwitterAuthButtonBase {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Auth with Twitter',
};
