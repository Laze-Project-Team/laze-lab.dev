import { Checkbox, Text } from '@mantine/core';
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
        <div>
          <Checkbox
            {...field}
            label={
              <Trans t={t} i18nKey="form.agreement.label">
                {[
                  <DefaultLink href="/terms" key="terms" />,
                  <DefaultLink href="/privacy" key="privacy" />,
                ]}
              </Trans>
            }
          />

          <Text color="dimmed">
            <Trans t={t} i18nKey="form.agreement.description">
              {[
                <DefaultLink href="/terms" key="terms" />,
                <DefaultLink href="/privacy" key="privacy" />,
              ]}
            </Trans>
          </Text>
          <Text color={error ? 'red' : 'dimmed'}>
            {error?.type === 'validate' && t('form.agreement.required')}
          </Text>
        </div>
      )}
    />
  );
};
