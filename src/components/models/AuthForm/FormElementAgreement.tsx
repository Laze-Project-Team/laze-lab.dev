import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Trans, useTranslation } from 'next-i18next';
import type { ReactElement } from 'react';
import type { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { DefaultLink } from '@/components/ui/DefaultLink';

export type formElementAgreementProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
};

export const FormElementAgreement = <T extends FieldValues>({
  name,
  control,
  error,
}: formElementAgreementProps<T>): ReactElement => {
  const [t] = useTranslation('common');

  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate: (val) => val }}
      render={({ field }) => (
        <FormControl variant="standard">
          <FormControlLabel
            htmlFor="agreement-checkbox"
            label={
              <Trans t={t} i18nKey="form.agreement.label">
                {[
                  <DefaultLink href="/terms" key="terms" />,
                  <DefaultLink href="/privacy" key="privacy" />,
                ]}
              </Trans>
            }
            control={<Checkbox id="agreement-checkbox" {...field} />}
          />
          <FormHelperText>
            <Trans t={t} i18nKey="form.agreement.description">
              {[
                <DefaultLink href="/terms" key="terms" />,
                <DefaultLink href="/privacy" key="privacy" />,
              ]}
            </Trans>
          </FormHelperText>
          <FormHelperText error={!!error}>
            {error?.type === 'validate' && t('form.agreement.required')}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};
