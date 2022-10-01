import { css } from '@emotion/react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import type { FC, ReactNode } from 'react';
import { useCallback, useState } from 'react';

import { localeList } from '@/const/locale';
import type { localeId } from '@/lib/utils/isLocale';
import { isLocale, locales } from '@/lib/utils/isLocale';

export type presentialLocaleSelectButtonProps = {
  locale: localeId;
  handleChange: (event: SelectChangeEvent<localeId>, child: ReactNode) => void;
};

export const PresentialLocaleSelectButton: FC<
  presentialLocaleSelectButtonProps
> = ({ locale, handleChange }) => {
  const [t] = useTranslation('layout');

  return (
    <>
      <FormControl
        size="small"
        css={css`
          width: 8rem;
        `}
      >
        <InputLabel id="locale-select-label">{t('changeLocale')}</InputLabel>
        <Select
          labelId="locale-select-label"
          id="locale-select"
          value={locale}
          label={t('changeLocale')}
          onChange={handleChange}
        >
          {locales.map((locale) => (
            <MenuItem value={locale} key={locale}>
              {localeList[locale]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export const LocaleSelectButton: FC = () => {
  const router = useRouter();
  const defaultLocale = isLocale(router.locale) ? router.locale : 'en';

  const [locale, setLocale] = useState<localeId>(defaultLocale);
  const handleChange: presentialLocaleSelectButtonProps['handleChange'] =
    useCallback(
      (e) => {
        const newLocale = e.target.value as localeId;
        setLocale(newLocale);
        router.push(router.pathname, router.asPath, { locale: newLocale });
      },
      [router],
    );

  return (
    <PresentialLocaleSelectButton locale={locale} handleChange={handleChange} />
  );
};
