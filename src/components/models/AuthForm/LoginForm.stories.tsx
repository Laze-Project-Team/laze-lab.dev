import type { Meta, StoryFn } from '@storybook/react';

import { AuthErrorProvider } from '@/components/layouts/LoginLayout/AuthError';

import { LoginForm } from './LoginForm';

export default {
  title: 'models/LoginForm',
  component: LoginForm,
} as Meta<typeof LoginForm>;

const Template: StoryFn<typeof LoginForm> = (props) => (
  <AuthErrorProvider>
    <LoginForm {...props} />
  </AuthErrorProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
