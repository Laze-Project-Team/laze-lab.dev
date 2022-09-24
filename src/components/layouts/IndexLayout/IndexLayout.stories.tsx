import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialIndexLayout } from './IndexLayout';

export default {
  title: 'layouts/IndexLayout',
  component: PresentialIndexLayout,
} as ComponentMeta<typeof PresentialIndexLayout>;

const Template: ComponentStory<typeof PresentialIndexLayout> = (props) => (
  <PresentialIndexLayout {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
