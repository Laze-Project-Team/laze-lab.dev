import type { Meta, StoryFn } from '@storybook/react';

import { PresentialIndexHeader } from './IndexHeader';

export default {
  title: 'models/IndexHeader',
  component: PresentialIndexHeader,
} as Meta<typeof PresentialIndexHeader>;

const Template: StoryFn<typeof PresentialIndexHeader> = (props) => (
  <PresentialIndexHeader {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
