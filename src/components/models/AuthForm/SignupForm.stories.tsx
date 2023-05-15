import type { Meta, StoryFn } from '@storybook/react';

import { AuthErrorProvider } from '@/components/layouts/LoginLayout/AuthError';

import { SignupForm } from './SignupForm';

export default {
  title: 'models/SignupForm',
  component: SignupForm,
} as Meta<typeof SignupForm>;

const Template: StoryFn<typeof SignupForm> = (props) => (
  <AuthErrorProvider>
    <SignupForm {...props} />
  </AuthErrorProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
