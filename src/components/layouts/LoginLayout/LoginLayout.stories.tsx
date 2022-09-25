import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialLoginLayout } from './LoginLayout';

export default {
  title: 'layouts/LoginLayout',
  component: PresentialLoginLayout,
} as ComponentMeta<typeof PresentialLoginLayout>;

const Template: ComponentStory<typeof PresentialLoginLayout> = (props) => (
  <PresentialLoginLayout {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  title: 'Here is the title',
  children: 'Here is the children',
};
