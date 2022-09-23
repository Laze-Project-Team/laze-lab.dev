import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { Descriptions } from '@/components/functional/Descriptions';
import { IndexLayout } from '@/components/layouts/IndexLayout';

export const PresentialHome: FC = () => {
  const [t] = useTranslation('index');

  return (
    <>
      <Descriptions title={t('title')} description={t('description')} />

      <body>
        <IndexLayout>This is Home</IndexLayout>
      </body>
    </>
  );
};

export const Home: FC = () => {
  return <PresentialHome />;
};
