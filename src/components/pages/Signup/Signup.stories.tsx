import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialSignup } from './Signup';

export default {
  title: 'pages/Signup',
  component: PresentialSignup,
} as ComponentMeta<typeof PresentialSignup>;

const Template: ComponentStory<typeof PresentialSignup> = (props) => (
  <PresentialSignup {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
