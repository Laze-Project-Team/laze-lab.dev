import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { SignupForm } from './SignupForm';

export default {
  title: 'models/SignupForm',
  component: SignupForm,
} as ComponentMeta<typeof SignupForm>;

const Template: ComponentStory<typeof SignupForm> = (props) => (
  <SignupForm {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
