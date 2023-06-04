import { css } from '@emotion/react';
import type { FC } from 'react';
import { useState } from 'react';
import type { ConnectDropTarget } from 'react-dnd';
import { useDrop } from 'react-dnd';

import { useAstArray } from '@/components/pages/Playground/ASTArrayContext';
import { gray } from '@/styles/colors';

import type { ASTToBlockProps } from '../CodeBlock/ASTToBlock';
import { ASTToBlock } from '../CodeBlock/ASTToBlock';
import type { DragBlockItem } from '../CodeBlock/useBlockDrag';

type presentialDroppableSpaceProps = {
  drop: ConnectDropTarget;
};

const PresentialDroppableSpace: FC<presentialDroppableSpaceProps> = ({
  drop,
  ...props
}) => {
  return <div ref={drop} {...props} />;
};

type droppableSpaceProps = {
  acceptedAstId: string[];
  astPath: (string | number)[];
  keyName: string | number;
  type: 'edit' | 'insert' | 'delete';
};

export const DroppableSpace: FC<droppableSpaceProps> = ({
  acceptedAstId,
  astPath,
  keyName,
  type,
  ...props
}) => {
  const { updateAstArray } = useAstArray();
  const [hoverState, setHoverState] = useState(false);
  const [hoverItemState, setHoverItemState] = useState<
    ASTToBlockProps | undefined
  >(undefined);
  const [, drop] = useDrop<DragBlockItem>(() => ({
    accept: 'block',
    hover(item) {
      if (acceptedAstId.includes(item.astId)) {
        setHoverItemState(item.astToBlockProps);
      } else {
        setHoverState(false);
      }
      return;
    },
    drop: (item) => {
      updateAstArray(astPath, type, keyName, item.astToBlockProps.ast);
      if (item.source !== 'editor') {
        return;
      }
      if (!(typeof keyName === 'number' && typeof item.keyName === 'number')) {
        updateAstArray(
          astPath,
          'delete',
          item.keyName,
          item.astToBlockProps.ast,
        );
        return;
      }
      if (keyName < item.keyName) {
        updateAstArray(
          astPath,
          'delete',
          item.keyName + 1,
          item.astToBlockProps.ast,
        );
        return;
      }
      updateAstArray(astPath, 'delete', item.keyName, item.astToBlockProps.ast);
      return;
    },
    canDrop: (item) => {
      return acceptedAstId.includes(item.astId);
    },
  }));

  return (
    <div
      onDragEnter={() => {
        setHoverState(true);
      }}
      onDragLeave={() => {
        setHoverState(false);
      }}
      onDrop={() => {
        setHoverState(false);
      }}
    >
      <PresentialDroppableSpace drop={drop} {...props} />
      {hoverState && hoverItemState && (
        <div
          css={css`
            opacity: 0.5;
          `}
        >
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
            {hoverItemState && <ASTToBlock {...hoverItemState} />}
          </div>
        </div>
      )}
    </div>
  );
};
