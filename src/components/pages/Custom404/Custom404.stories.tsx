import type { Meta, StoryFn } from '@storybook/react';

import { PresentialCustom404 } from './Custom404';

export default {
  title: 'pages/Custom404',
  component: PresentialCustom404,
} as Meta<typeof PresentialCustom404>;

const Template: StoryFn<typeof PresentialCustom404> = (props) => (
  <PresentialCustom404 {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
