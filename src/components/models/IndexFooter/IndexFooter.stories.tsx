import type { Meta, StoryFn } from '@storybook/react';

import { PresentialIndexFooter } from './IndexFooter';

export default {
  title: 'models/IndexFooter',
  component: PresentialIndexFooter,
} as Meta<typeof PresentialIndexFooter>;

const Template: StoryFn<typeof PresentialIndexFooter> = (props) => (
  <PresentialIndexFooter {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
