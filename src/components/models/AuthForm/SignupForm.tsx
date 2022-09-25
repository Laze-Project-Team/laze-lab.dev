import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Trans, useTranslation } from 'next-i18next';
import type { DOMAttributes, FC } from 'react';
import type { Control, FieldErrorsImpl } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import { useEmailAuth } from '@/components/hooks/useAuth';
import { useAuthError } from '@/components/layouts/LoginLayout/useAuthError';
import { DefaultLink } from '@/components/ui/DefaultLink';

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
};

export const PresentialSignupForm: FC<presentialSignupFormProps> = ({
  onSubmit,
  control,
  errors,
  isValid,
}) => {
  const [t] = useTranslation('signup');

  return (
    <>
      <form onSubmit={onSubmit} aria-label={t('form.label')} role="form">
        <Stack direction="column" spacing={2}>
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
          <Controller
            name="agreement"
            control={control}
            rules={{ validate: (val) => val }}
            render={({ field }) => (
              <>
                <FormControlLabel
                  label={
                    <Trans t={t} i18nKey="form.label.agreement">
                      {[
                        <DefaultLink href="/terms" key="terms" />,
                        <DefaultLink href="/privacy" key="privacy" />,
                      ]}
                    </Trans>
                  }
                  control={<Checkbox {...field} />}
                />
                <FormHelperText>
                  <Trans t={t} i18nKey="form.label.agreement_text">
                    {[
                      <DefaultLink href="/terms" key="terms" />,
                      <DefaultLink href="/privacy" key="privacy" />,
                    ]}
                  </Trans>
                </FormHelperText>
                <FormHelperText error>
                  {errors.agreement?.type
                    ? t('form.message.agreement.required')
                    : ' '}
                </FormHelperText>
              </>
            )}
          ></Controller>
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

export const SignupForm: FC = (props) => {
  const { authenticate } = useEmailAuth('signup');
  const { handleError } = useAuthError();

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
    authenticate(data.email, data.password)
      .then((credential) => {
        console.log(credential);
      })
      .catch(handleError);
  };

  return (
    <PresentialSignupForm
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      errors={errors}
      isValid={isValid}
      {...props}
    />
  );
};
