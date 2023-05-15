import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Descriptions } from '@/components/functional/Descriptions';
import { PlaygroundLayout } from '@/components/layouts/PlaygroundLayout';

export const PresentialPlayground: FC = () => {
  const [t] = useTranslation(['playground']);

  return (
    <>
      <Descriptions title={t('title')} description={t('description')} />

      <PlaygroundLayout></PlaygroundLayout>
    </>
  );
};

export const Playground: FC = () => {
  return <PresentialPlayground />;
};
