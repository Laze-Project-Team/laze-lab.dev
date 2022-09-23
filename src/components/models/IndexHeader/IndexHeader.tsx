import { css } from '@emotion/react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import type { FC } from 'react';

import { LazeLogo } from '@/components/ui/LazeLogo';

import { HeaderLink } from './HeaderLink';

export const PresentialIndexHeader: FC = () => {
  return (
    <>
      <AppBar color="default" position="static">
        <Container maxWidth="md">
          <Toolbar>
            <HeaderLink href="/">
              <LazeLogo option="logo" size={30} />
              <span
                css={css`
                  color: var(--color-laze-primary);
                  font-size: 1.75rem;
                `}
              >
                Laze
              </span>
            </HeaderLink>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export const IndexHeader: FC = () => {
  return <PresentialIndexHeader />;
};
