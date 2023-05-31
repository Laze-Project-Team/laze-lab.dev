import type { FC } from 'react';
import type { ConnectDropTarget } from 'react-dnd';
import { useDrop } from 'react-dnd';

import type { ast } from '@/components/pages/Playground/editorLanguageType';

import type { DragBlockItem } from '../CodeBlock/ASTToBlock';

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
  type: 'edit' | 'insert';
  updateAstArray: (
    astPath: (string | number)[],
    type: 'edit' | 'insert',
    keyName: string | number,
    value: ast | string,
  ) => void;
};

export const DroppableSpace: FC<droppableSpaceProps> = ({
  acceptedAstId,
  astPath,
  keyName,
  type,
  updateAstArray,
  ...props
}) => {
  const [, drop] = useDrop<DragBlockItem>(() => ({
    accept: 'block',
    drop: (item) => {
      updateAstArray(astPath, type, keyName, item.ast);
    },
    canDrop: (item) => {
      return acceptedAstId.includes(item.astId);
    },
  }));

  return <PresentialDroppableSpace drop={drop} {...props} />;
};
