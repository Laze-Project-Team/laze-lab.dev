import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialIndexHeader } from './IndexHeader';

export default {
  title: 'models/IndexHeader',
  component: PresentialIndexHeader,
} as ComponentMeta<typeof PresentialIndexHeader>;

const Template: ComponentStory<typeof PresentialIndexHeader> = (props) => (
  <PresentialIndexHeader {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
