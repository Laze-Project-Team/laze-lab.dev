import { Button, LoadingOverlay, Stack } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { DOMAttributes, FC } from 'react';
import { useState } from 'react';
import type { Control, FieldErrorsImpl } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useEmailAuth } from '@/components/hooks/useAuth';
import { useAuthError } from '@/components/layouts/LoginLayout/useAuthError';
import { pagesPath } from '@/lib/$path';

import { FormElementEmail } from './FormElementEmail';
import { FormElementPassword } from './FormElementPassword';

export type loginFormValue = {
  email: string;
  password: string;
};

export type presentialLoginFormProps = {
  onSubmit: NonNullable<DOMAttributes<HTMLFormElement>['onSubmit']>;
  control: Control<loginFormValue>;
  errors: FieldErrorsImpl<loginFormValue>;
  isValid: boolean;
  isProcessing: boolean;
};

export const PresentialLoginForm: FC<presentialLoginFormProps> = ({
  onSubmit,
  control,
  errors,
  isValid,
  isProcessing,
}) => {
  const [t] = useTranslation('login');

  return (
    <>
      <LoadingOverlay visible={isProcessing} overlayBlur={2} />

      <form onSubmit={onSubmit} aria-label={t('form.label')} role="form">
        <Stack dir="column" spacing="md">
          <FormElementEmail
            name="email"
            control={control}
            error={errors.email}
          />
          <FormElementPassword
            name="password"
            control={control}
            error={errors.password}
            isSignup={false}
          />
          <Button
            type="submit"
            variant="filled"
            disabled={!isValid && !isProcessing}
            aria-disabled={!isValid && !isProcessing}
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
  const [isProcessing, setIsProcessing] = useState(false);

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
    setIsProcessing(true);

    authenticate(data.email, data.password)
      .then((_credential) => {
        push(pagesPath.$url());
      })
      .catch(handleError)
      .finally(() => setIsProcessing(false));
  };

  return (
    <PresentialLoginForm
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      errors={errors}
      isValid={isValid}
      isProcessing={isProcessing}
      {...props}
    />
  );
};
