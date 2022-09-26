import { MDXProvider } from '@mdx-js/react';
import type { MDXComponents } from 'mdx/types';
import type { FC, ReactNode } from 'react';

import { IndexLayout } from '@/components/layouts/IndexLayout/IndexLayout';

export type indexLayoutProviderProps = {
  children?: ReactNode;
};

export type presentialIndexLayoutProviderProps = indexLayoutProviderProps;

const components: MDXComponents = {};

export const PresentialIndexLayoutProvider: FC<
  presentialIndexLayoutProviderProps
> = ({ children }) => {
  return (
    <>
      <MDXProvider components={components}>
        <IndexLayout>{children}</IndexLayout>
      </MDXProvider>
    </>
  );
};

export const IndexLayoutProvider: FC<indexLayoutProviderProps> = (props) => {
  return <PresentialIndexLayoutProvider {...props} />;
};
