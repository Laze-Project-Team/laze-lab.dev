import { css } from '@emotion/react';
import type { SelectProps } from '@mantine/core';
import { Select } from '@mantine/core';
import type { FC, RefAttributes } from 'react';
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
} & Omit<SelectProps, 'data'> &
  RefAttributes<HTMLInputElement>;

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
          <Select
            {...field}
            label={label}
            id={`${id}-${name}`}
            value={options.find((item) => item.value === field.value)?.value}
            onChange={(value) => {
              onChange(value);
            }}
            data={options}
            css={css`
              width: 100%;
              margin-top: 0.5rem;
            `}
            {...props}
          ></Select>
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
