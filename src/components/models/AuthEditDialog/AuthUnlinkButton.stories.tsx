import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { PresentialAuthUnlinkButton } from './AuthUnlinkButton';

export default {
  title: 'models/AuthEditDialog/AuthUnlinkButton',
  component: PresentialAuthUnlinkButton,
} as ComponentMeta<typeof PresentialAuthUnlinkButton>;

const Template: ComponentStory<typeof PresentialAuthUnlinkButton> = (props) => (
  <PresentialAuthUnlinkButton
    {...props}
    handleClick={() => void 0}
    handleCancel={() => void 0}
    handleConfirm={() => void 0}
  />
);

export const Primary = Template.bind({});
Primary.args = {
  providerId: 'google.com',
  isWorking: false,
  isConfirmationDialogOpen: false,
};

export const Confirmation = Template.bind({});
Confirmation.args = {
  providerId: 'google.com',
  isWorking: false,
  isConfirmationDialogOpen: true,
};

export const Unlinking = Template.bind({});
Unlinking.args = {
  providerId: 'google.com',
  isWorking: true,
  isConfirmationDialogOpen: false,
};
