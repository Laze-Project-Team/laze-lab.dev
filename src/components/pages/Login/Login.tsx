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
import { LoginForm } from '@/components/models/AuthForm';
import { DefaultLink } from '@/components/ui/DefaultLink';
import { pagesPath } from '@/lib/$path';
import { gray } from '@/styles/colors';

export const PresentialLogin: FC = () => {
  const [t] = useTranslation(['login', 'common']);

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
            <AuthButton method="Google" authType="login" />
            <AuthButton method="Twitter" authType="login" />
            <AuthButton method="GitHub" authType="login" />
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
          <LoginForm />
        </AuthErrorProvider>

        <p
          css={css`
            margin-top: 2rem;
            text-align: right;
          `}
        >
          <Trans t={t} i18nKey="footer">
            {[<DefaultLink href={pagesPath.signup.$url()} key="/signup" />]}
          </Trans>
        </p>
      </LoginLayout>
    </>
  );
};

export const Login: FC = () => {
  return <PresentialLogin />;
};
