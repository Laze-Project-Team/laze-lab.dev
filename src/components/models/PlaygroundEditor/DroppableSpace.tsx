import { css } from '@emotion/react';
import type { FC } from 'react';
import { useState } from 'react';
import type { ConnectDropTarget } from 'react-dnd';
import { useDrop } from 'react-dnd';

import { useAstArray } from '@/components/pages/Playground/ASTArrayContext';
import { blue } from '@/styles/colors';

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
      const newAst = structuredClone(item.astToBlockProps.ast);
      updateAstArray(astPath, type, keyName, newAst);
      if (item.source !== 'editor') {
        return;
      }
      if (!(typeof keyName === 'number' && typeof item.keyName === 'number')) {
        updateAstArray(astPath, 'delete', item.keyName, newAst);
        return;
      }
      if (keyName < item.keyName) {
        updateAstArray(astPath, 'delete', item.keyName + 1, newAst);
        return;
      }
      updateAstArray(astPath, 'delete', item.keyName, newAst);
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
            opacity: 0.8;
          `}
        >
          <div
            css={css`
              width: min-content;
              padding-right: 4px;
              padding-left: 4px;
              border: 2px solid ${blue[4]};
              border-radius: 4px;
              margin-left: -4px;
              background-color: ${blue[1]};
            `}
          >
            {hoverItemState && <ASTToBlock {...hoverItemState} />}
          </div>
        </div>
      )}
    </div>
  );
};
