import type { ConnectDragPreview, ConnectDragSource } from 'react-dnd';
import { useDrag } from 'react-dnd';
import { v4 } from 'uuid';

import type { ast } from '@/components/pages/Playground/editorLanguageType';

import type { ASTToBlockProps } from './ASTToBlock';

export type DragBlockItem = {
  astToBlockProps: ASTToBlockProps;
  astId: string;
  id: string;
  keyName: number | string;
  source: 'sidebar' | 'editor';
};

export const useBlockDrag = (
  ast: ast,
  astPath: (string | number)[],
  draggable: boolean,
  source: 'sidebar' | 'editor',
): {
  isDragging: boolean;
  drag: ConnectDragSource;
  preview: ConnectDragPreview;
} => {
  const [{ isDragging }, drag, preview] = useDrag<
    DragBlockItem,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      type: 'block',
      item:
        !Array.isArray(ast) && ast['$astId']
          ? {
              astToBlockProps: {
                ast,
                astPath,
                draggable,
              },
              astId: typeof ast['$astId'] === 'string' ? ast['$astId'] : '',
              id: v4(),
              keyName: astPath.length ? astPath.slice(-1)[0] : 0,
              source,
            }
          : undefined,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [ast, astPath],
  );
  return { isDragging, drag, preview };
};
