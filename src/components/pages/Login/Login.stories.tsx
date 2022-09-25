import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialLogin } from './Login';

export default {
  title: 'pages/Login',
  component: PresentialLogin,
} as ComponentMeta<typeof PresentialLogin>;

const Template: ComponentStory<typeof PresentialLogin> = (props) => (
  <PresentialLogin {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
