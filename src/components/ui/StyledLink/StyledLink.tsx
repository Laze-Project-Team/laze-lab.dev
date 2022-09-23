/* eslint-disable react/jsx-no-target-blank */
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
          {...props}
        >
          {children}
          {!disableIcon && !isInternal && <OpenInNewIcon />}
        </a>
      </Link>
    </>
  );
};

export const StyledLink: FC<styledLinkProps> = (props) => {
  return <PresentialStyledLink {...props} />;
};
