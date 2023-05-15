/* eslint-disable react/jsx-no-target-blank */
import { css } from '@emotion/react';
import { IconExternalLink } from '@tabler/icons-react';
import Link from 'next/link';
import type { ComponentPropsWithRef, FC } from 'react';
import type { UrlObject } from 'url';

import { isInternalLink } from '@/lib/utils/isInternalLink';

export type styledLinkProps = {
  href: UrlObject | string;
  disableIcon?: boolean;
} & Omit<ComponentPropsWithRef<'a'>, 'href'>;

export type presentialStyledLinkProps = styledLinkProps;

export const PresentialStyledLink: FC<presentialStyledLinkProps> = ({
  href,
  children,
  disableIcon,
  ...props
}) => {
  const isInternal = isInternalLink(href);

  return (
    <>
      <Link
        href={href}
        target={isInternal ? undefined : '_blank'}
        rel={isInternal ? undefined : 'noopener noreferrer'}
        css={[
          css`
            display: inline-flex;
            align-items: center;
          `,
        ]}
        {...props}
      >
        {children}
        {!disableIcon && !isInternal && (
          <IconExternalLink
            css={css`
              width: 1rem;
              height: 1rem;
              margin-left: 0.25rem;
            `}
          />
        )}
      </Link>
    </>
  );
};

export const StyledLink: FC<styledLinkProps> = (props) => {
  return <PresentialStyledLink {...props} />;
};
