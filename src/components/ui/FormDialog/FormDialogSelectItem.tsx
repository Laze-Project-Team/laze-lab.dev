import { css } from '@emotion/react';
import MenuItem from '@mui/material/MenuItem';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { useFormDialogContext } from '@/components/ui/FormDialog/FormDialogContext';

export type formDialogSelectItemProps = {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[];
} & TextFieldProps;

export type presentialFormDialogSelectItemProps = {
  id: string;
  control: Control;
} & formDialogSelectItemProps;

export const PresentialFormDialogSelectItem: FC<
  presentialFormDialogSelectItemProps
> = ({ id, control, label, name, options, ...props }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <TextField
            {...field}
            select
            label={label}
            id={`${id}-${name}`}
            value={options.find((item) => item.value === field.value)?.value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            fullWidth
            css={css`
              margin-top: 0.5rem;
            `}
            {...props}
          >
            {options.map((item) => (
              <MenuItem value={item.value} key={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </>
  );
};

export const FormDialogSelectItem: FC<formDialogSelectItemProps> = (props) => {
  const { id, control } = useFormDialogContext();
  return (
    <PresentialFormDialogSelectItem id={id} control={control} {...props} />
  );
};
