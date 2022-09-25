import { css } from '@emotion/react';
import type { FC } from 'react';
import { match } from 'ts-pattern';

import { useColorMode } from '@/components/contexts/ColorModeContext';
import type { styledLinkProps } from '@/components/ui/StyledLink';
import { StyledLink } from '@/components/ui/StyledLink';

export type defaultLinkProps = styledLinkProps;

export type presentialDefaultLinkProps = defaultLinkProps;

export const PresentialDefaultLink: FC<presentialDefaultLinkProps> = ({
  css: cssProp,
  ...props
}) => {
  const { theme, colorMode } = useColorMode();

  const linkHoverColor = match(colorMode)
    .with('light', () => theme.palette.primary.light)
    .with('dark', () => theme.palette.primary.dark)
    .exhaustive();

  return (
    <>
      <StyledLink
        css={[
          cssProp,
          css`
            color: ${theme.palette.primary.main};
            transition: color 0.1s;

            &:hover,
            &:focus {
              color: ${linkHoverColor};
            }
          `,
        ]}
        {...props}
      ></StyledLink>
    </>
  );
};

export const DefaultLink: FC<defaultLinkProps> = (props) => {
  return <PresentialDefaultLink {...props} />;
};
