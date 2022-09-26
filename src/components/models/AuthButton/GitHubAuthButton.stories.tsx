import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { AuthErrorProvider } from '@/components/layouts/LoginLayout/AuthError';

import { GitHubAuthButton } from './GitHubAuthButton';

export default {
  title: 'models/AuthButton/GitHubAuthButton',
  component: GitHubAuthButton,
} as ComponentMeta<typeof GitHubAuthButton>;

const Template: ComponentStory<typeof GitHubAuthButton> = (props) => (
  <AuthErrorProvider>
    <GitHubAuthButton {...props} />
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
