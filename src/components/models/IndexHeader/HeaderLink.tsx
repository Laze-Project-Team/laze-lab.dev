import { css } from '@emotion/react';
import type { FC } from 'react';

import type { styledLinkProps } from '@/components/ui/StyledLink';
import { StyledLink } from '@/components/ui/StyledLink';

export const HeaderLink: FC<styledLinkProps> = (props) => {
  return (
    <>
      <StyledLink
        css={css`
          display: inline-flex;
          align-items: center;
          padding: 0.6rem 1rem;
          gap: 0 0.25rem;
          text-decoration: none;
          transition: background-color 0.2s;

          &:hover {
            background-color: rgba(255, 255, 255, 0.1);
          }
        `}
        {...props}
      />
    </>
  );
};
