/* eslint-disable react/jsx-no-target-blank */
import { css } from '@emotion/react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Link from 'next/link';
import type { ComponentPropsWithRef, FC } from 'react';

export type styledLinkProps = {
  href: string;
  disableIcon?: boolean;
} & ComponentPropsWithRef<'a'>;

export type presentialStyledLinkProps = styledLinkProps;

export const PresentialStyledLink: FC<presentialStyledLinkProps> = ({
  href,
  children,
  disableIcon,
  css: cssProp,
  ...props
}) => {
  const isInternal = href.startsWith('/') || href.startsWith('#');

  return (
    <>
      <Link href={href} passHref>
        <a
          href={href}
          target={isInternal ? undefined : '_blank'}
          rel={isInternal ? undefined : 'noopener noreferrer'}
          css={[
            cssProp,
            css`
              display: inline-flex;
              align-items: center;
            `,
          ]}
          {...props}
        >
          {children}
          {!disableIcon && !isInternal && (
            <OpenInNewIcon
              css={css`
                width: 1rem;
                height: 1rem;
                margin-left: 0.25rem;
              `}
            />
          )}
        </a>
      </Link>
    </>
  );
};

export const StyledLink: FC<styledLinkProps> = (props) => {
  return <PresentialStyledLink {...props} />;
};
