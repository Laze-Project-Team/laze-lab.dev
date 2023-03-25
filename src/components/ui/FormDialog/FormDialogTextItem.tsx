import { css } from '@emotion/react';
import type { InputProps } from '@mantine/core';
import { Input } from '@mantine/core';
import type { FC, InputHTMLAttributes } from 'react';
import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { useFormDialogContext } from '@/components/ui/FormDialog/FormDialogContext';

export type formDialogTextItemProps = {
  label: string;
  name: string;
} & InputProps &
  InputHTMLAttributes<HTMLInputElement>;

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
          <Input.Wrapper label={label}>
            <Input
              id={`${id}-${name}`}
              variant="outlined"
              css={css`
                width: 100%;
              `}
              {...props}
              {...field}
            />
          </Input.Wrapper>
        )}
      />
    </>
  );
};

export const FormDialogTextItem: FC<formDialogTextItemProps> = (props) => {
  const { id, control } = useFormDialogContext();
  return <PresentialFormDialogTextItem {...props} id={id} control={control} />;
};
