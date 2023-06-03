import { css } from '@emotion/react';
import type { FC } from 'react';
import { useDragLayer } from 'react-dnd';

import { gray } from '@/styles/colors';

import type { DragBlockItem } from '../CodeBlock/ASTToBlock';
import { ASTToBlock } from '../CodeBlock/ASTToBlock';

const getItemStyles = (
  initialOffset: { x: number; y: number },
  currentOffset: { x: number; y: number },
) => {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
};

export const BlockDragLayer: FC = () => {
  const { item, initialOffset, currentOffset } = useDragLayer<{
    item: DragBlockItem;
    initialOffset: { x: number; y: number };
    currentOffset: { x: number; y: number };
  }>((monitor) => ({
    item: monitor.getItem(),
    initialOffset: monitor.getInitialSourceClientOffset() ?? { x: 0, y: 0 },
    currentOffset: monitor.getSourceClientOffset() ?? { x: 0, y: 0 },
  }));

  if (!item) {
    return null;
  }
  return (
    <div
      css={css`
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
      `}
    >
      <div style={getItemStyles(initialOffset, currentOffset)}>
        <div
          css={css`
            display: flex;
            width: min-content;
            align-items: center;
            padding: 8px;
            padding-top: 0;
            padding-bottom: 0;
            border: 2px solid ${gray[2]};
            border-radius: 4px;
            background-color: white;
            opacity: 1;
            white-space: pre;

            &:hover {
              cursor: pointer;
            }
          `}
        >
          <ASTToBlock {...item.astToBlockProps} />
        </div>
      </div>
    </div>
  );
};
