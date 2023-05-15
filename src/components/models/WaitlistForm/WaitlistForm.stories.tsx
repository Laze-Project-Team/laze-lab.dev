import type { Meta, StoryFn } from '@storybook/react';

import { PresentialWaitlistForm } from './WaitlistForm';

export default {
  title: 'models/WaitlistForm',
  component: PresentialWaitlistForm,
} as Meta<typeof PresentialWaitlistForm>;

const Template: StoryFn<typeof PresentialWaitlistForm> = (props) => (
  <PresentialWaitlistForm {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
