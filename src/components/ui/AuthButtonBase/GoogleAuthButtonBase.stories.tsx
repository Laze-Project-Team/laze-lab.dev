import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { GoogleAuthButtonBase } from './GoogleAuthButtonBase';

export default {
  title: 'models/AuthButtonBase/GoogleAuthButtonBase',
  component: GoogleAuthButtonBase,
} as ComponentMeta<typeof GoogleAuthButtonBase>;

const Template: ComponentStory<typeof GoogleAuthButtonBase> = (props) => (
  <GoogleAuthButtonBase {...props} />
);

export const Google = Template.bind({});
Google.args = {
  children: 'Auth with Google',
};
