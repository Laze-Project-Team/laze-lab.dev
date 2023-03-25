import { css } from '@emotion/react';
import type { FC, ReactNode } from 'react';

import { StyledLink } from '@/components/ui/StyledLink';
import { gray } from '@/styles/colors';

export type footerLinkListProps = {
  title: ReactNode;
  links: {
    title: ReactNode;
    href: string;
  }[];
};
export const FooterLinkList: FC<footerLinkListProps> = ({ title, links }) => {
  return (
    <>
      <div>
        <p
          css={css`
            margin-bottom: 0.5rem;
            color: whitesmoke;
            font-weight: bolder;
          `}
        >
          {title}
        </p>
        <div
          css={css`
            display: grid;
            grid-row-gap: 0.25rem;
            grid-template-columns: 1fr;
          `}
        >
          {links.map((link) => (
            <StyledLink
              css={css`
                color: ${gray[4]};
                text-decoration: none;

                &:hover {
                  text-decoration: underline;
                }
              `}
              // TODO: フッターでリンクされているページの整備
              // TODO: Implement pages linked in footer
              // href={link.href}
              href="/"
              key={link.href}
            >
              {link.title}
            </StyledLink>
          ))}
        </div>
      </div>
    </>
  );
};
