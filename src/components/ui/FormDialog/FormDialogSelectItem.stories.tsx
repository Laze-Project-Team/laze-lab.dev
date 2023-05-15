import type { Meta, StoryFn } from '@storybook/react';
import type { FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { PresentialFormDialogSelectItem } from './FormDialogSelectItem';

export default {
  title: 'models/FormDialogSelectItem',
  component: PresentialFormDialogSelectItem,
} as Meta<typeof PresentialFormDialogSelectItem>;

const Template: StoryFn<typeof PresentialFormDialogSelectItem> = (props) => {
  const { control } = useForm<FieldValues>({
    defaultValues: {
      select: 'item-1',
    },
  });
  return <PresentialFormDialogSelectItem {...props} control={control} />;
};

export const Primary = Template.bind({});
Primary.args = {
  id: 'storybook-form-dialog',
  label: 'dialog select item',
  name: 'select',
  options: [
    {
      value: 'item-1',
      label: 'Item 1',
    },
    {
      value: 'item-2',
      label: 'Item 2',
    },
    {
      value: 'item-3',
      label: 'Item 3',
    },
    {
      value: 'item-4',
      label: 'Item 4',
    },
    {
      value: 'item-5',
      label: 'Item 5',
    },
  ],
};
