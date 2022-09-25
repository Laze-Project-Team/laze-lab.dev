import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { TwitterAuthButton } from './TwitterAuthButton';

export default {
  title: 'models/AuthButton/TwitterAuthButton',
  component: TwitterAuthButton,
} as ComponentMeta<typeof TwitterAuthButton>;

const Template: ComponentStory<typeof TwitterAuthButton> = (props) => (
  <TwitterAuthButton {...props} />
);

export const Login = Template.bind({});
Login.args = {
  type: 'login',
};

export const Signup = Template.bind({});
Signup.args = {
  type: 'signup',
};
