import { PasswordInput } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { ReactElement } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

export type formElementPasswordProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  isSignup: boolean;
};

export type presentialFormElementPasswordProps<T extends FieldValues> =
  formElementPasswordProps<T>;

export const PresentialFormElementPassword = <T extends FieldValues>({
  name,
  control,
  error,
  isSignup,
}: presentialFormElementPasswordProps<T>): ReactElement => {
  const [t] = useTranslation('common');

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true, minLength: isSignup ? 8 : undefined }}
      render={({ field }) => (
        <div>
          <PasswordInput
            label={t('form.password.label')}
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            role="textbox"
            description={isSignup && t('form.password.min_length')}
            error={
              <>
                {error?.type === 'required' && t('form.password.required')}
                {error?.type === 'minLength' && t('form.password.min_length')}
              </>
            }
            {...field}
          />
        </div>
      )}
    />
  );
};

export const FormElementPassword = <T extends FieldValues>({
  ...props
}: formElementPasswordProps<T>): ReactElement => {
  return <PresentialFormElementPassword {...props} />;
};
