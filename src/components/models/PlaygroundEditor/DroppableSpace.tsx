import type { Dispatch, FC, SetStateAction } from 'react';
import type { ConnectDropTarget } from 'react-dnd';
import { useDrop } from 'react-dnd';

import type { ast } from '@/components/pages/Playground/editorLanguageType';

import type { DragBlockItem } from '../CodeBlock/ASTToBlock';
import { updateAstArray } from './updateAstArray';

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
  astArray: ast[];
  acceptedAstId: string[];
  astPath: (string | number)[];
  keyName: string | number;
  setAstArray: Dispatch<SetStateAction<ast[]>>;
  type: 'edit' | 'insert';
};

export const DroppableSpace: FC<droppableSpaceProps> = ({
  astArray,
  acceptedAstId,
  astPath,
  keyName,
  setAstArray,
  type,
  ...props
}) => {
  const [, drop] = useDrop<DragBlockItem>(() => ({
    accept: 'block',
    drop: (item) => {
      console.log(item);
      updateAstArray(astArray, setAstArray, astPath, type, keyName, item.ast);
    },
    canDrop: (item) => {
      return acceptedAstId.includes(item.astId);
    },
  }));

  return <PresentialDroppableSpace drop={drop} {...props} />;
};
