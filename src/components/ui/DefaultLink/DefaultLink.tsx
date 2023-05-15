import { css } from '@emotion/react';
import { useMantineTheme } from '@mantine/core';
import type { FC } from 'react';

import { useColorMode } from '@/components/contexts/ColorModeContext';
import type { styledLinkProps } from '@/components/ui/StyledLink';
import { StyledLink } from '@/components/ui/StyledLink';

export type defaultLinkProps = styledLinkProps;

export type presentialDefaultLinkProps = defaultLinkProps;

export const PresentialDefaultLink: FC<presentialDefaultLinkProps> = ({
  ...props
}) => {
  const {
    primaryColor,
    fn: { darken, lighten },
  } = useMantineTheme();
  const { themePattern } = useColorMode();

  const linkHoverColor = themePattern(
    lighten(primaryColor, 0.1),
    darken(primaryColor, 0.1),
  );

  return (
    <>
      <StyledLink
        css={css`
          color: ${primaryColor};
          transition: color 0.1s;

          &:hover,
          &:focus {
            color: ${linkHoverColor};
          }
        `}
        {...props}
      />
    </>
  );
};

export const DefaultLink: FC<defaultLinkProps> = (props) => {
  return <PresentialDefaultLink {...props} />;
};
