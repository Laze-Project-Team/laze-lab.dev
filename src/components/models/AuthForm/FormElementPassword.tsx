import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import { useTranslation } from 'next-i18next';
import type { ReactElement } from 'react';
import { useState } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

export type formElementPasswordProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  isSignup: boolean;
};

export type presentialFormElementPasswordProps<T extends FieldValues> = {
  showPassword: boolean;
  handleClickShowPassword: () => void;
} & formElementPasswordProps<T>;

export const PresentialFormElementPassword = <T extends FieldValues>({
  name,
  control,
  error,
  isSignup,
  showPassword,
  handleClickShowPassword,
}: presentialFormElementPasswordProps<T>): ReactElement => {
  const [t] = useTranslation('common');

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true, minLength: isSignup ? 8 : undefined }}
      render={({ field }) => (
        <FormControl variant="standard">
          <InputLabel htmlFor="password-input">
            {t('form.password.label')}
          </InputLabel>
          <Input
            id="password-input"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            type={showPassword ? 'text' : 'password'}
            inputProps={{ role: 'textbox' }}
            error={!!error}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={t('form.password.show_button')}
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
            {...field}
          />
          <FormHelperText error={!!error}>
            <>
              {error?.type === 'required' && t('form.password.required')}
              {error?.type === 'minLength' && t('form.password.min_length')}
              {isSignup && !error && t('form.password.min_length')}
            </>
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export const FormElementPassword = <T extends FieldValues>({
  ...props
}: formElementPasswordProps<T>): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <PresentialFormElementPassword
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      {...props}
    />
  );
};
