import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { AuthErrorProvider } from '@/components/layouts/LoginLayout/AuthError';

import { SignupForm } from './SignupForm';

export default {
  title: 'models/SignupForm',
  component: SignupForm,
} as ComponentMeta<typeof SignupForm>;

const Template: ComponentStory<typeof SignupForm> = (props) => (
  <AuthErrorProvider>
    <SignupForm {...props} />
  </AuthErrorProvider>
);

export const Primary = Template.bind({});
Primary.args = {};
