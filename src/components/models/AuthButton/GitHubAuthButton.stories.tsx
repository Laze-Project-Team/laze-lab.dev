import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { GitHubAuthButton } from './GitHubAuthButton';

export default {
  title: 'models/AuthButton/GitHubAuthButton',
  component: GitHubAuthButton,
} as ComponentMeta<typeof GitHubAuthButton>;

const Template: ComponentStory<typeof GitHubAuthButton> = (props) => (
  <GitHubAuthButton {...props} />
);

export const Login = Template.bind({});
Login.args = {
  type: 'login',
};

export const Signup = Template.bind({});
Signup.args = {
  type: 'signup',
};
