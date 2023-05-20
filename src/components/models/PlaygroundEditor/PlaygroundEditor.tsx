import { css } from '@emotion/react';
import type { FC } from 'react';
import { useDrop } from 'react-dnd';

export const PresentialPlaygroundEditor: FC = () => {
  return <div></div>;
};

export const PlaygroundEditor: FC = () => {
  const [, drop] = useDrop(() => ({
    accept: 'block',
  }));
  return (
    <div
      ref={drop}
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      <PresentialPlaygroundEditor />
    </div>
  );
};
