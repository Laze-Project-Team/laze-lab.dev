import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialLoadingButton } from './LoadingButton';

export default {
  title: 'ui/LoadingButton',
  component: PresentialLoadingButton,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      defaultValue: 'medium',
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof PresentialLoadingButton>;

const Template: ComponentStory<typeof PresentialLoadingButton> = (props) => (
  <PresentialLoadingButton {...props} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'button content',
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'button content',
  loading: true,
  size: 'small',
};
