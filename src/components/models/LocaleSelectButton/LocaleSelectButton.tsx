import { css } from '@emotion/react';
import { Select } from '@mantine/core';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useCallback, useState } from 'react';

import { localeList } from '@/const/locale';
import type { localeId } from '@/lib/utils/isLocale';
import { isLocale, locales } from '@/lib/utils/isLocale';

export type presentialLocaleSelectButtonProps = {
  locale: localeId;
  handleChange: (value: string) => void;
};

export const PresentialLocaleSelectButton: FC<
  presentialLocaleSelectButtonProps
> = ({ locale, handleChange, ...props }) => {
  const [t] = useTranslation('layout');

  return (
    <>
      <div
        css={css`
          width: 8rem;
        `}
        {...props}
      >
        <Select
          value={locale}
          label={t('changeLocale')}
          onChange={handleChange}
          data={locales.map((locale) => ({
            value: locale,
            label: localeList[locale],
          }))}
        />
      </div>
    </>
  );
};

export const LocaleSelectButton: FC = (props) => {
  const router = useRouter();
  const defaultLocale = isLocale(router.locale) ? router.locale : 'en';

  const [locale, setLocale] = useState<localeId>(defaultLocale);
  const handleChange: presentialLocaleSelectButtonProps['handleChange'] =
    useCallback(
      (newLocale) => {
        if (isLocale(newLocale)) {
          setLocale(newLocale);
          router.push(router.pathname, router.asPath, { locale: newLocale });
        }
      },
      [router],
    );

  return (
    <PresentialLocaleSelectButton
      locale={locale}
      handleChange={handleChange}
      {...props}
    />
  );
};
