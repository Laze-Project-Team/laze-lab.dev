import { css } from '@emotion/react';
import { Divider, Stack } from '@mantine/core';
import { Trans, useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { Descriptions } from '@/components/functional/Descriptions';
import { LoginLayout } from '@/components/layouts/LoginLayout';
import {
  AuthError,
  AuthErrorProvider,
} from '@/components/layouts/LoginLayout/AuthError';
import { AuthButton } from '@/components/models/AuthButton';
import { SignupForm } from '@/components/models/AuthForm';
import { DefaultLink } from '@/components/ui/DefaultLink';
import { pagesPath } from '@/lib/$path';
import { gray } from '@/styles/colors';

export const PresentialSignup: FC = () => {
  const [t] = useTranslation(['signup', 'common']);

  return (
    <>
      <Descriptions title={t('title')} description={t('description')} />

      <LoginLayout title={t('title')}>
        <AuthErrorProvider>
          <div
            css={css`
              margin-bottom: 32px;
            `}
          >
            <AuthError />
          </div>
          <Stack spacing={16} dir="column">
            <AuthButton method="Google" authType="signup" />
            <AuthButton method="Twitter" authType="signup" />
            <AuthButton method="GitHub" authType="signup" />
          </Stack>
        </AuthErrorProvider>

        <Divider
          css={css`
            margin: 2rem 0 1rem;
            color: ${gray[4]};
          `}
        >
          {t('common:or')}
        </Divider>

        <AuthErrorProvider>
          <div
            css={css`
              margin-top: 16px;
              margin-bottom: 32px;
            `}
          >
            <AuthError />
          </div>
          <SignupForm />
        </AuthErrorProvider>

        <p
          css={css`
            margin-top: 2rem;
            text-align: right;
          `}
        >
          <Trans t={t} i18nKey="footer">
            {[<DefaultLink href={pagesPath.login.$url()} key="/login" />]}
          </Trans>
        </p>
      </LoginLayout>
    </>
  );
};

export const Signup: FC = () => {
  return <PresentialSignup />;
};
