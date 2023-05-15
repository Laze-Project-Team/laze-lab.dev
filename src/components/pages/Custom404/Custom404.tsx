import { css } from '@emotion/react';
import { Stack } from '@mantine/core';
import { Trans, useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { Descriptions } from '@/components/functional/Descriptions';
import { IndexLayout } from '@/components/layouts/IndexLayout';
import { DefaultLink } from '@/components/ui/DefaultLink';
import { pagesPath } from '@/lib/$path';

export const PresentialCustom404: FC = () => {
  const [t] = useTranslation('404');

  return (
    <>
      <Descriptions title={t('title')} description={t('description')} noindex />

      <IndexLayout>
        <Stack
          spacing={32}
          css={css`
            display: flex;
            height: 100%;
            flex-direction: column;
            justify-content: center;
            text-align: center;
          `}
        >
          <p
            css={css`
              font-size: 8rem;
              line-height: 6rem;
            `}
          >
            404
          </p>
          <p
            css={css`
              font-size: 2rem;
            `}
          >
            PAGE NOT FOUND
          </p>
          <p>{t('message')}</p>
          <p>
            <Trans t={t} i18nKey="action">
              <DefaultLink href={pagesPath.$url()} />
            </Trans>
          </p>
        </Stack>
      </IndexLayout>
    </>
  );
};

export const Custom404: FC = () => {
  return <PresentialCustom404 />;
};
