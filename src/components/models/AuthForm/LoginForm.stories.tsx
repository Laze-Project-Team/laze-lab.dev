import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { AuthErrorProvider } from '@/components/layouts/LoginLayout/AuthError';

import { LoginForm } from './LoginForm';

export default {
  title: 'models/LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (props) => (
  <AuthErrorProvider>
    <LoginForm {...props} />
  </AuthErrorProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
