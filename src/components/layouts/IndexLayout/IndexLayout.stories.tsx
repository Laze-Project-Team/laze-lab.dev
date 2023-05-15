import type { Meta, StoryFn } from '@storybook/react';

import { PresentialIndexLayout } from './IndexLayout';

export default {
  title: 'layouts/IndexLayout',
  component: PresentialIndexLayout,
} as Meta<typeof PresentialIndexLayout>;

const Template: StoryFn<typeof PresentialIndexLayout> = (props) => (
  <PresentialIndexLayout {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
