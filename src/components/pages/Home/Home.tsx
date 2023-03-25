import { css } from '@emotion/react';
import { Skeleton, Stack } from '@mantine/core';
import { Trans, useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { Descriptions } from '@/components/functional/Descriptions';
import {
  FeatureSection,
  FeatureSectionWrapper,
} from '@/components/models/FeatureSection';
import { WaitlistForm } from '@/components/models/WaitlistForm';
import { LazeLogo } from '@/components/ui/LazeLogo';
import { blue, gray } from '@/styles/colors';

const emphasized = (
  <span
    key="0"
    css={css`
      color: ${blue[8]};
    `}
  />
);

export const PresentialHome: FC = () => {
  const [t] = useTranslation(['index', 'common']);

  return (
    <>
      <Descriptions title={t('title')} description={t('description')} />

      <header
        css={css`
          padding: 8px 16px;
          margin-bottom: 64px;
          box-shadow: ${gray[3]} 0 0 5px 0;
        `}
      >
        <div
          css={css`
            max-width: 1200px;
            margin: 0 auto;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              gap: 4px;
            `}
          >
            <LazeLogo option="logo" alt="" size={30}></LazeLogo>
            <span
              css={css`
                color: var(--color-laze-primary);
                font-size: 1.5rem;
              `}
            >
              LazeLab
            </span>
          </div>
        </div>
      </header>
      <main
        css={css`
          max-width: 1200px;
          margin: 0 auto;
        `}
      >
        <Stack dir="column" spacing={96} align="center" px={16}>
          <Stack dir="column" spacing={32}>
            <p
              css={css`
                font-size: 5rem;
                font-weight: 900;
                text-align: center;
              `}
            >
              <Trans t={t} i18nKey="hero_section.hero_text">
                {[emphasized]}
              </Trans>
            </p>
            <p
              css={css`
                color: ${gray[7]};
                font-size: 1.2rem;
                font-weight: 500;
                text-align: center;
              `}
            >
              {t('hero_section.hero_text_description')}
            </p>
          </Stack>
          <WaitlistForm />
          ここにイメージ画像を入れる
          <FeatureSectionWrapper>
            <FeatureSection
              imagePosition="right"
              title={<Trans t={t} i18nKey="features.1.title" />}
              description={<Trans t={t} i18nKey="features.1.description" />}
              image={<Skeleton width="100%" height="100%" />}
            />
            <FeatureSection
              imagePosition="left"
              title={<Trans t={t} i18nKey="features.2.title" />}
              description={<Trans t={t} i18nKey="features.2.description" />}
              image={<Skeleton width="100%" height="100%" />}
            />
            <FeatureSection
              imagePosition="right"
              title={<Trans t={t} i18nKey="features.3.title" />}
              description={<Trans t={t} i18nKey="features.3.description" />}
              image={<Skeleton width="100%" height="100%" />}
            />
            <FeatureSection
              imagePosition="left"
              title={<Trans t={t} i18nKey="features.4.title" />}
              description={<Trans t={t} i18nKey="features.4.description" />}
              image={
                <Skeleton variant="rectangular" width="100%" height="100%" />
              }
            />
          </FeatureSectionWrapper>
          <WaitlistForm />
          <p
            css={css`
              color: ${gray[6]};
            `}
          >
            {t('beta_message')}
          </p>
        </Stack>
      </main>

      <footer
        css={css`
          padding: 16px;
          margin-top: 128px;
          background-color: ${gray[1]};
        `}
      >
        <p
          css={css`
            color: ${gray[7]};
            text-align: center;
          `}
        >
          {t('common:copyright')}
        </p>
      </footer>
    </>
  );
};

export const Home: FC = () => {
  return <PresentialHome />;
};
