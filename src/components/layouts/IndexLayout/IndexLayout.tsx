import { css } from '@emotion/react';
import Container from '@mui/material/Container';
import type { FC, ReactNode } from 'react';

import { IndexFooter } from '@/components/models/IndexFooter';
import { IndexHeader } from '@/components/models/IndexHeader';

export type indexLayoutProps = {
  children?: ReactNode;
};

export type presentialIndexLayoutProps = indexLayoutProps;

export const PresentialIndexLayout: FC<presentialIndexLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <div
        css={css`
          display: grid;
          height: 100vh;
          grid-template-rows: auto 1fr auto;
        `}
      >
        <IndexHeader />

        <main
          css={css`
            padding: 4rem 0;
          `}
        >
          <Container maxWidth="md">
            {/* Matching the children type of Container */}
            <>{children}</>
          </Container>
        </main>

        <IndexFooter />
      </div>
    </>
  );
};

export const IndexLayout: FC<indexLayoutProps> = (props) => {
  return <PresentialIndexLayout {...props} />;
};
