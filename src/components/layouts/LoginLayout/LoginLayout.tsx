import { css } from '@emotion/react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Container from '@mui/material/Container';
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
    <Container maxWidth="sm">
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
          <ArrowBackIosIcon sx={{ fontSize: '1rem' }} />
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
