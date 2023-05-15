import type { Meta, StoryFn } from '@storybook/react';

import { PresentialLogin } from './Login';

export default {
  title: 'pages/Login',
  component: PresentialLogin,
} as Meta<typeof PresentialLogin>;

const Template: StoryFn<typeof PresentialLogin> = (props) => (
  <PresentialLogin {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
