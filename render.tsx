import type {
  Queries,
  queries,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import { render as defaultRender } from '@testing-library/react';
import type { FC, ReactNode } from 'react';

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
) => FC<wrapperProps>;

const globalWrapperHOC: globalWrapperHOCType = (Wrapper) => {
  const globalWrapper: FC<wrapperProps> = ({ children }) => (
    <ColorModeProvider>
      {Wrapper ? (
        <Wrapper>
          <>{children}</>
        </Wrapper>
      ) : (
        children
      )}
    </ColorModeProvider>
  );

  return globalWrapper;
};

export const render: renderType = (ui, options) =>
  defaultRender(ui, {
    ...options,
    wrapper: globalWrapperHOC(options?.wrapper),
  });
