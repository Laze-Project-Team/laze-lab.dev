import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { LoginForm } from './LoginForm';

export default {
  title: 'models/LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (props) => (
  <LoginForm {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
