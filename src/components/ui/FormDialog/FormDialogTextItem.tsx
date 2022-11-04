import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { useFormDialogContext } from '@/components/ui/FormDialog/FormDialogContext';

export type formDialogTextItemProps = {
  label: string;
  name: string;
} & TextFieldProps;

export type presentialFormDialogTextItemProps = {
  id: string;
  control: Control;
} & formDialogTextItemProps;

export const PresentialFormDialogTextItem: FC<
  presentialFormDialogTextItemProps
> = ({ id, control, label, name, ...props }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            id={`${id}-${name}`}
            label={label}
            variant="outlined"
            fullWidth
            {...props}
            {...field}
          />
        )}
      />
    </>
  );
};

export const FormDialogTextItem: FC<formDialogTextItemProps> = (props) => {
  const { id, control } = useFormDialogContext();
  return <PresentialFormDialogTextItem {...props} id={id} control={control} />;
};
