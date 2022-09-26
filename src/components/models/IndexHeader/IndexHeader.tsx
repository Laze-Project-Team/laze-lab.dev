import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import type { FC } from 'react';

import { LazeLogo } from '@/components/ui/LazeLogo';
import { pagesPath } from '@/lib/$path';

import { HeaderLink } from './HeaderLink';

export const PresentialIndexHeader: FC = () => {
  return (
    <>
      <AppBar
        color="default"
        position="static"
        sx={{ backgroundColor: 'var(--color-darkgray)' }}
      >
        <Container maxWidth="md">
          <Toolbar>
            <HeaderLink href={pagesPath.$url().pathname}>
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
