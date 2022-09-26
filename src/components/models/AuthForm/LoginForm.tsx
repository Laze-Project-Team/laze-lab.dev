import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { DOMAttributes, FC } from 'react';
import type { Control, FieldErrorsImpl } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import { useEmailAuth } from '@/components/hooks/useAuth';
import { useAuthError } from '@/components/layouts/LoginLayout/useAuthError';
import { pagesPath } from '@/lib/$path';

export type loginFormValue = {
  email: string;
  password: string;
};

export type presentialLoginFormProps = {
  onSubmit: NonNullable<DOMAttributes<HTMLFormElement>['onSubmit']>;
  control: Control<loginFormValue>;
  errors: FieldErrorsImpl<loginFormValue>;
  isValid: boolean;
};

export const PresentialLoginForm: FC<presentialLoginFormProps> = ({
  onSubmit,
  control,
  errors,
  isValid,
}) => {
  const [t] = useTranslation('login');

  return (
    <>
      <form onSubmit={onSubmit} aria-label={t('form.label')} role="form">
        <Stack direction="column" spacing={1}>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <TextField
                  label={t('form.label.email')}
                  variant="standard"
                  error={!!errors.email?.type}
                  helperText={
                    errors.email?.type ? t('form.message.email.required') : ' '
                  }
                  {...field}
                />
              );
            }}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label={t('form.label.password')}
                variant="standard"
                error={!!errors.password?.type}
                helperText={
                  errors.password?.type
                    ? t('form.message.password.required')
                    : ' '
                }
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={!isValid}
            aria-disabled={!isValid}
          >
            {t('form.label.submit')}
          </Button>
        </Stack>
      </form>
    </>
  );
};

export const LoginForm: FC = (props) => {
  const { authenticate } = useEmailAuth('login');
  const { handleError } = useAuthError();
  const { push } = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<loginFormValue>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: loginFormValue) => {
    authenticate(data.email, data.password)
      .then((_credential) => {
        push(pagesPath.$url().pathname);
      })
      .catch(handleError);
  };

  return (
    <PresentialLoginForm
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      errors={errors}
      isValid={isValid}
      {...props}
    />
  );
};
