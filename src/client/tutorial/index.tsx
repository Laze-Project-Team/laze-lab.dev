import {
  AppShell,
  Burger,
  Drawer,
  Flex,
  Header,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from '@mantine/core';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { Content } from '@/client/tutorial/Content';

import { Navigation } from './Navigation';

export const Tutorial: FC = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const handler = () => {
      const mediaQuery = matchMedia(`(min-width: ${theme.breakpoints.sm})`);
      if (mediaQuery.matches) {
        setOpened(false);
      }
    };
    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, [theme.breakpoints.sm]);

  return (
    <AppShell
      header={
        <Header height={32}>
          <Flex>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </Flex>
        </Header>
      }
      navbarOffsetBreakpoint="sm"
      navbar={
        <>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Drawer opened={opened} onClose={() => setOpened(false)} size={300}>
              <Navigation />
            </Drawer>
          </MediaQuery>

          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <Navbar width={{ base: 300 }} hiddenBreakpoint="sm">
              <Navigation />
            </Navbar>
          </MediaQuery>
        </>
      }
    >
      <Content />
    </AppShell>
  );
};
