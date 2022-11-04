import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { PresentialFormDialogTextItem } from './FormDialogTextItem';

export default {
  title: 'models/FormDialogTextItem',
  component: PresentialFormDialogTextItem,
} as ComponentMeta<typeof PresentialFormDialogTextItem>;

const Template: ComponentStory<typeof PresentialFormDialogTextItem> = (
  props,
) => {
  const { control } = useForm<FieldValues>({
    defaultValues: {
      text: 'sample text',
    },
  });
  return <PresentialFormDialogTextItem {...props} control={control} />;
};

export const Primary = Template.bind({});
Primary.args = {
  id: 'storybook-form-dialog',
  label: 'dialog text item',
  name: 'text',
};
