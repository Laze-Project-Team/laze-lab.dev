import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { Trans, useTranslation } from 'next-i18next';
import type { DOMAttributes, FC } from 'react';
import { useState } from 'react';
import type { Control, FieldErrorsImpl } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

import { useEmailAuth } from '@/components/hooks/useAuth';
import { useAuthError } from '@/components/layouts/LoginLayout/useAuthError';
import { DefaultLink } from '@/components/ui/DefaultLink';
import { pagesPath } from '@/lib/$path';

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
  showPassword: boolean;
  handleClickShowPassword: () => void;
};

export const PresentialSignupForm: FC<presentialSignupFormProps> = ({
  onSubmit,
  control,
  errors,
  isValid,
  isProcessing,
  showPassword,
  handleClickShowPassword,
}) => {
  const [t] = useTranslation('signup');

  return (
    <>
      <Backdrop
        open={isProcessing}
        sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <form onSubmit={onSubmit} aria-label={t('form.label')} role="form">
        <Stack direction="column" spacing={2}>
          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => {
              return (
                <TextField
                  autoComplete="email"
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
              <FormControl variant="standard">
                <InputLabel htmlFor="signup-password">
                  {t('form.label.password')}
                </InputLabel>
                <Input
                  id="signup-password"
                  autoComplete="new-password"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password?.type}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={t('form.label.show_password')}
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...field}
                />
                <FormHelperText error>
                  {errors.password ? t('form.message.password.required') : ' '}
                </FormHelperText>
              </FormControl>
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
  const [showPassword, setShowPassword] = useState(false);

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

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <PresentialSignupForm
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      errors={errors}
      isValid={isValid}
      isProcessing={isProcessing}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      {...props}
    />
  );
};
