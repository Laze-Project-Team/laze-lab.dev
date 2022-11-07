import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialAuthButton } from './AuthButton';

export default {
  title: 'models/AuthButton',
  component: PresentialAuthButton,
} as ComponentMeta<typeof PresentialAuthButton>;

const Template: ComponentStory<typeof PresentialAuthButton> = (props) => (
  <PresentialAuthButton {...props} />
);

export const LoginWithGoogle = Template.bind({});
LoginWithGoogle.args = {
  method: 'Google',
  authType: 'login',
};

export const LoginWithTwitter = Template.bind({});
LoginWithTwitter.args = {
  method: 'Twitter',
  authType: 'login',
};

export const LoginWithGitHub = Template.bind({});
LoginWithGitHub.args = {
  method: 'GitHub',
  authType: 'login',
};
export const SignupWithGoogle = Template.bind({});
SignupWithGoogle.args = {
  method: 'Google',
  authType: 'signup',
};

export const SignupWithTwitter = Template.bind({});
SignupWithTwitter.args = {
  method: 'Twitter',
  authType: 'signup',
};

export const SignupWithGitHub = Template.bind({});
SignupWithGitHub.args = {
  method: 'GitHub',
  authType: 'signup',
};
