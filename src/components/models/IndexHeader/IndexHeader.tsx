import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import type { FC } from 'react';

import { ColorModeProvider } from '@/components/contexts/ColorModeContext';
import { ColorModeSwitcher } from '@/components/models/ColorModeSwitcher';
import { LocaleSelectButton } from '@/components/models/LocaleSelectButton';
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
        <Container maxWidth="lg">
          <Toolbar
            css={css`
              display: flex;
            `}
          >
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

            <Stack
              css={css`
                margin-left: auto;
                color: #eee;
              `}
              direction="row"
              spacing={2}
            >
              <ColorModeSwitcher
                css={css`
                  &&:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                  }
                `}
              />

              <ColorModeProvider preferTheme="dark" isLocal>
                <LocaleSelectButton />
              </ColorModeProvider>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export const IndexHeader: FC = () => {
  return <PresentialIndexHeader />;
};
