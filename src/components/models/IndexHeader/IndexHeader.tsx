import { css } from '@emotion/react';
import { Container, Flex, Header, Stack } from '@mantine/core';
import type { FC } from 'react';

import { ColorModeSwitcher } from '@/components/models/ColorModeSwitcher';
import { LocaleSelectButton } from '@/components/models/LocaleSelectButton';
import { LazeLogo } from '@/components/ui/LazeLogo';
import { pagesPath } from '@/lib/$path';
import { blue, gray } from '@/styles/colors';

import { HeaderLink } from './HeaderLink';

export const PresentialIndexHeader: FC = () => {
  return (
    <>
      <Header bg="#001529" height={64}>
        <Container maw="1200px">
          <Flex>
            <HeaderLink href={pagesPath.$url()}>
              <LazeLogo option="logo" size={30} alt="" />
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
              dir="row"
              spacing={16}
            >
              <ColorModeSwitcher
                css={css`
                  &&:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                  }
                `}
              />

              <LocaleSelectButton
                css={css`
                  && {
                    fieldset {
                      border-color: ${gray[6]};
                    }

                    .MuiInputBase-root:hover fieldset {
                      border-color: ${gray[4]};
                    }

                    .MuiInputBase-root.Mui-focused fieldset {
                      border-color: ${blue[2]};
                    }

                    .MuiInputBase-root,
                    label,
                    svg {
                      color: ${gray[2]};
                    }

                    label.Mui-focused,
                    .MuiInputBase-root.Mui-focused {
                      color: ${blue[2]};
                    }
                  }
                `}
              />
            </Stack>
          </Flex>
        </Container>
      </Header>
    </>
  );
};

export const IndexHeader: FC = () => {
  return <PresentialIndexHeader />;
};
