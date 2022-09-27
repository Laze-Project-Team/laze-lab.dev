import type { FC } from 'react';

import { DefaultLink } from '@/components/ui/DefaultLink';

export const Link: FC<JSX.IntrinsicElements['a']> = ({ children, href }) => (
  <DefaultLink href={href ?? ''}>{children}</DefaultLink>
);
