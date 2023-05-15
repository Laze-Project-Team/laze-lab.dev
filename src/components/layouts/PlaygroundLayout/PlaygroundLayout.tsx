import { css } from '@emotion/react';
import type { FC, ReactNode } from 'react';

import { PlaygroundFooter } from './PlaygroundFooter';
import { PlaygroundHeader } from './PlaygroundHeader';
import { PlaygroundSider } from './PlaygroundSider';

export type playgroundLayoutProps = {
  children?: ReactNode;
};

export type presentialPlaygroundLayoutProps = playgroundLayoutProps;

export const PresentialPlaygroundLayout: FC<playgroundLayoutProps> = ({
  children,
}) => {
  return (
    <>
      <PlaygroundHeader />
      <div
        css={css`
          display: flex;
          width: 100vw;
          height: calc(100vh - 66px);
        `}
      >
        <PlaygroundSider />
        <main
          css={css`
            display: flex;
          `}
        >
          {children}
        </main>
      </div>
      <PlaygroundFooter />
    </>
  );
};

export const PlaygroundLayout: FC = () => {
  return <PresentialPlaygroundLayout />;
};
