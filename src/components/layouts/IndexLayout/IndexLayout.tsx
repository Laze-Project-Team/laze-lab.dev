import { css } from '@emotion/react';
import { Container } from '@mantine/core';
import type { FC, ReactNode } from 'react';

import { useColorMode } from '@/components/contexts/ColorModeContext';
import { IndexFooter } from '@/components/models/IndexFooter';
import { IndexHeader } from '@/components/models/IndexHeader';

export type indexLayoutProps = {
  children?: ReactNode;
};

export type presentialIndexLayoutProps = indexLayoutProps;

export const PresentialIndexLayout: FC<presentialIndexLayoutProps> = ({
  children,
}) => {
  const { themePattern } = useColorMode();
  const backgroundColor = themePattern('#f9fbfe', '#0a1929');

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
            width: 100vw;
            padding: 4rem 0;
            background-color: ${backgroundColor};
          `}
        >
          <Container maw="1200px">
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
