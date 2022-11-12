import TextField from '@mui/material/TextField';
import { useTranslation } from 'next-i18next';
import type { ReactElement } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

export type formElementEmailProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
};

export const FormElementEmail = <T extends FieldValues>({
  name,
  control,
  error,
}: formElementEmailProps<T>): ReactElement => {
  const [t] = useTranslation('common');

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => {
        return (
          <TextField
            autoComplete="email"
            label={t('form.email.label')}
            variant="standard"
            error={!!error}
            helperText={error?.type === 'required' && t('form.email.required')}
            {...field}
          />
        );
      }}
    />
  );
};
