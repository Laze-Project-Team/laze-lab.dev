import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { GoogleAuthButton } from './GoogleAuthButton';

export default {
  title: 'models/AuthButton/GoogleAuthButton',
  component: GoogleAuthButton,
} as ComponentMeta<typeof GoogleAuthButton>;

const Template: ComponentStory<typeof GoogleAuthButton> = (props) => (
  <GoogleAuthButton {...props} />
);

export const Login = Template.bind({});
Login.args = {
  type: 'login',
};

export const Signup = Template.bind({});
Signup.args = {
  type: 'signup',
};
