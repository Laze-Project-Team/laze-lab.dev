import type {
  Queries,
  queries,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { render as originalRender } from '@testing-library/react';
import type { FC, ReactNode } from 'react';

import { UserInfoProvider } from '/__mocks__/UserInfoProvider';
import { ColorModeProvider } from '@/components/contexts/ColorModeContext';

export type renderType<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
> = (
  ui: React.ReactElement,
  options?: RenderOptions<Q, Container, BaseElement>,
) => RenderResult<Q, Container, BaseElement>;

type wrapperProps = {
  children?: ReactNode;
};

type globalWrapperHOCType = (
  wrapper?: React.JSXElementConstructor<{ children: React.ReactElement }>,
) => React.JSXElementConstructor<{ children: React.ReactElement }>;

const globalWrapperHOC: globalWrapperHOCType = (Wrapper) => {
  const globalWrapper: FC<wrapperProps> = ({ children }) => (
    <ColorModeProvider>
      <UserInfoProvider>
        {Wrapper ? (
          <Wrapper>
            <>{children}</>
          </Wrapper>
        ) : (
          children
        )}
      </UserInfoProvider>
    </ColorModeProvider>
  );

  return globalWrapper;
};

export const render: renderType = (ui, options) =>
  originalRender(ui, {
    ...options,
    wrapper: globalWrapperHOC(options?.wrapper),
  });
