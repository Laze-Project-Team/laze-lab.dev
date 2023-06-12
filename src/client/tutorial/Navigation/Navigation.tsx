import { css } from '@emotion/react';
import { NavLink, useMantineTheme } from '@mantine/core';
import type { Icon } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import type { FC } from 'react';

import { gray } from '@/styles/colors';

type PresentialNavigationProps = {
  activeIndex: number;
} & NavigationProps;

export const PresentialNavigation: FC<PresentialNavigationProps> = ({
  links,
  activeIndex,
}) => {
  const theme = useMantineTheme();

  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        padding: 0.5rem;

        /* border-right: 1px solid #ebebeb; */
        gap: 4px;
      `}
    >
      {links.map((link, i) => (
        <NavLink
          key={link.href}
          active={activeIndex === i}
          label={link.label}
          description={link.description}
          icon={link.icon && <link.icon size="1.125rem" />}
          variant="light"
          css={css`
            color: ${gray[7]};

            ${activeIndex !== i &&
            css`
              &:hover {
                color: ${theme.black};
              }
            `}
          `}
        />
      ))}
    </div>
  );
};

export type NavigationLink = {
  icon?: Icon;
  label: string;
  href: string;
  description?: string;
};

type NavigationProps = {
  links: NavigationLink[];
};

export const Navigation: FC<NavigationProps> = ({ links }) => {
  const { pathname } = useRouter();
  const activeIndex = links.findIndex((link) => link.href === pathname);

  return <PresentialNavigation links={links} activeIndex={activeIndex} />;
};
