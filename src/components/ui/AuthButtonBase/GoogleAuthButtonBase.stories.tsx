import type { Meta, StoryFn } from '@storybook/react';

import { GoogleAuthButtonBase } from './GoogleAuthButtonBase';

export default {
  title: 'models/AuthButtonBase/GoogleAuthButtonBase',
  component: GoogleAuthButtonBase,
} as Meta<typeof GoogleAuthButtonBase>;

const Template: StoryFn<typeof GoogleAuthButtonBase> = (props) => (
  <GoogleAuthButtonBase {...props} />
);

export const Google = Template.bind({});
Google.args = {
  children: 'Auth with Google',
};
