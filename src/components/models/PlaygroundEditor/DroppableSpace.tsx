import type { FC } from 'react';
import type { ConnectDropTarget } from 'react-dnd';
import { useDrop } from 'react-dnd';

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
};

export const DroppableSpace: FC<droppableSpaceProps> = ({
  acceptedAstId,
  ...props
}) => {
  const [, drop] = useDrop<DragBlockItem>(() => ({
    accept: 'block',
    drop: (item, monitor) => {
      console.log(item, monitor);
    },
    canDrop: (item) => {
      return acceptedAstId.includes(item.astId);
    },
  }));

  return <PresentialDroppableSpace drop={drop} {...props} />;
};
