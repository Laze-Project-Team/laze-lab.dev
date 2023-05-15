import { Stack } from '@mantine/core';
import {
  EmailAuthProvider,
  linkWithCredential,
  sendEmailVerification,
} from 'firebase/auth';
import { useTranslation } from 'next-i18next';
import type { DOMAttributes, FC } from 'react';
import { useState } from 'react';
import type { Control, FieldErrorsImpl } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useUserInfoContext } from '@/components/contexts/UserInfoContext';
import { FormElementEmail } from '@/components/models/AuthForm/FormElementEmail';
import { FormElementPassword } from '@/components/models/AuthForm/FormElementPassword';
import { LoadingButton } from '@/components/ui/LoadingButton';

export type emailAuthValue = {
  email: string;
  password: string;
};

export type presentialEmailAuthFormProps = {
  control: Control<emailAuthValue>;
  errors: FieldErrorsImpl<emailAuthValue>;
  isValid: boolean;
  isProcessing: boolean;
  onSubmit: NonNullable<DOMAttributes<HTMLFormElement>['onSubmit']>;
};

export const PresentialEmailAuthForm: FC<presentialEmailAuthFormProps> = ({
  control,
  errors,
  isValid,
  isProcessing,
  onSubmit,
  ...props
}) => {
  const [t] = useTranslation('profile');

  return (
    <form onSubmit={onSubmit} {...props}>
      <Stack spacing={16}>
        <FormElementEmail name="email" control={control} error={errors.email} />
        <FormElementPassword
          name="password"
          control={control}
          error={errors.password}
          isSignup
        />
        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!isValid}
          loading={isProcessing}
        >
          {t('auth.auth_email_submit')}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export const EmailAuthForm: FC = ({ ...props }) => {
  const [t] = useTranslation('profile');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, syncUser } = useUserInfoContext();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<emailAuthValue>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = handleSubmit((data) => {
    const currentUser = user.data;
    if (!currentUser) {
      toast(t('auth.edit_failed'), { type: 'error' });
      return;
    }
    setIsProcessing(true);

    const credential = EmailAuthProvider.credential(data.email, data.password);
    linkWithCredential(currentUser, credential)
      .then((credential) => {
        toast(t('auth.edit_success'), { type: 'success' });
        syncUser();

        if (!credential.user.emailVerified) {
          sendEmailVerification(credential.user);
        }
      })
      .catch((e) => {
        console.log(e);

        toast(t('auth.edit_failed'), { type: 'error' });
      })
      .finally(() => {
        setIsProcessing(false);
      });
  });

  return (
    <PresentialEmailAuthForm
      control={control}
      errors={errors}
      isValid={isValid}
      isProcessing={isProcessing}
      onSubmit={onSubmit}
      {...props}
    />
  );
};
