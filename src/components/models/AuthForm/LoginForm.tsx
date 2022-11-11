import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { DOMAttributes, FC } from 'react';
import { useState } from 'react';
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
  isProcessing: boolean;
  showPassword: boolean;
  handleClickShowPassword: () => void;
};

export const PresentialLoginForm: FC<presentialLoginFormProps> = ({
  onSubmit,
  control,
  errors,
  isValid,
  isProcessing,
  showPassword,
  handleClickShowPassword,
}) => {
  const [t] = useTranslation('login');

  return (
    <>
      <Backdrop
        open={isProcessing}
        sx={{ color: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <form onSubmit={onSubmit} aria-label={t('form.label')} role="form">
        <Stack direction="column" spacing={1}>
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
                <InputLabel htmlFor="login-password">
                  {t('form.label.password')}
                </InputLabel>
                <Input
                  id="login-password"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  inputProps={{ role: 'textbox' }}
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

export const LoginForm: FC = (props) => {
  const { authenticate } = useEmailAuth('login');
  const { handleError } = useAuthError();
  const { push } = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <PresentialLoginForm
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
