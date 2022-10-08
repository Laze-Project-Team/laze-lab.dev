import { css } from '@emotion/react';
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
        <p
          css={css`
            font-size: 8rem;
            text-align: center;
          `}
        >
          404
        </p>
        <p
          css={css`
            font-size: 2rem;
            text-align: center;
          `}
        >
          PAGE NOT FOUND
        </p>
        <p
          css={css`
            margin-top: 2rem;
            text-align: center;
          `}
        >
          <Trans t={t} i18nKey="message">
            <DefaultLink href={pagesPath.$url()} />
          </Trans>
        </p>
      </IndexLayout>
    </>
  );
};

export const Custom404: FC = () => {
  return <PresentialCustom404 />;
};
