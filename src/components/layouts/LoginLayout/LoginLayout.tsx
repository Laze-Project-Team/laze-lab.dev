import { css } from '@emotion/react';
import { Container } from '@mantine/core';
import { IconArrowBack } from '@tabler/icons-react';
import { useTranslation } from 'next-i18next';
import type { FC, ReactNode } from 'react';

import { DefaultLink } from '@/components/ui/DefaultLink';
import { pagesPath } from '@/lib/$path';

export type loginLayoutProps = {
  title: ReactNode;
  children?: ReactNode;
};

export type presentialLoginLayoutProps = loginLayoutProps;

export const PresentialLoginLayout: FC<presentialLoginLayoutProps> = ({
  title,
  children,
}) => {
  const [t] = useTranslation('common');

  return (
    <Container maw="720px">
      <main>
        <h1
          css={css`
            margin: 2rem 0;
            font-size: 1.5rem;
            text-align: center;
          `}
        >
          {title}
        </h1>

        <DefaultLink href={pagesPath.$url()}>
          <IconArrowBack size="1rem" />
          <span>{t('backToHome')}</span>
        </DefaultLink>

        {children}
      </main>
    </Container>
  );
};

export const LoginLayout: FC<loginLayoutProps> = (props) => {
  return <PresentialLoginLayout {...props} />;
};
