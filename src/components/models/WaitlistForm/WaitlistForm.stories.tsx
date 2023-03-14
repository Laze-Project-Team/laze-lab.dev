import type { ComponentMeta,ComponentStory } from '@storybook/react';

import { PresentialWaitlistForm } from './WaitlistForm';

export default {
  title: 'models/WaitlistForm',
  component: PresentialWaitlistForm,
} as ComponentMeta<typeof PresentialWaitlistForm>;

const Template: ComponentStory<typeof PresentialWaitlistForm> = (props) => (
  <PresentialWaitlistForm {...props} />
);

export const Primary = Template.bind({});
Primary.args = {};
