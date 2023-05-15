import type { Meta, StoryFn } from '@storybook/react';

import { PresentialSignup } from './Signup';

export default {
  title: 'pages/Signup',
  component: PresentialSignup,
} as Meta<typeof PresentialSignup>;

const Template: StoryFn<typeof PresentialSignup> = (props) => (
  <PresentialSignup {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
