import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { AuthErrorProvider } from '@/components/layouts/LoginLayout/AuthError';

import { TwitterAuthButton } from './TwitterAuthButton';

export default {
  title: 'models/AuthButton/TwitterAuthButton',
  component: TwitterAuthButton,
} as ComponentMeta<typeof TwitterAuthButton>;

const Template: ComponentStory<typeof TwitterAuthButton> = (props) => (
  <AuthErrorProvider>
    <TwitterAuthButton {...props} />
  </AuthErrorProvider>
);

export const Login = Template.bind({});
Login.args = {
  type: 'login',
};

export const Signup = Template.bind({});
Signup.args = {
  type: 'signup',
};
