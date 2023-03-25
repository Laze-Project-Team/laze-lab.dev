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

import { FormElementAgreement } from './FormElementAgreement';
import { FormElementEmail } from './FormElementEmail';
import { FormElementPassword } from './FormElementPassword';

export type signupFormValue = {
  email: string;
  password: string;
  agreement: boolean;
};

export type presentialSignupFormProps = {
  onSubmit: NonNullable<DOMAttributes<HTMLFormElement>['onSubmit']>;
  control: Control<signupFormValue>;
  errors: FieldErrorsImpl<signupFormValue>;
  isValid: boolean;
  isProcessing: boolean;
};

export const PresentialSignupForm: FC<presentialSignupFormProps> = ({
  onSubmit,
  control,
  errors,
  isValid,
  isProcessing,
}) => {
  const [t] = useTranslation('signup');

  return (
    <>
      <LoadingOverlay visible={isProcessing} />

      <form onSubmit={onSubmit} aria-label={t('form.label')} role="form">
        <Stack dir="column" spacing={2}>
          <FormElementEmail
            name="email"
            control={control}
            error={errors.email}
          />
          <FormElementPassword
            name="password"
            control={control}
            error={errors.password}
            isSignup
          />
          <FormElementAgreement
            name="agreement"
            control={control}
            error={errors.agreement}
          />
          <Button
            type="submit"
            variant="contained"
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

export const SignupForm: FC = (props) => {
  const { authenticate } = useEmailAuth('signup');
  const { handleError } = useAuthError();
  const { push } = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<signupFormValue>({
    defaultValues: {
      email: '',
      password: '',
      agreement: false,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: signupFormValue) => {
    setIsProcessing(true);

    authenticate(data.email, data.password)
      .then((_credential) => {
        push(pagesPath.$url());
      })
      .catch(handleError)
      .finally(() => setIsProcessing(false));
  };

  return (
    <PresentialSignupForm
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      errors={errors}
      isValid={isValid}
      isProcessing={isProcessing}
      {...props}
    />
  );
};
