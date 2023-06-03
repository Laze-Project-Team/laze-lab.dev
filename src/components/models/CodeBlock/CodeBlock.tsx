import { css } from '@emotion/react';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { uuid } from 'uuidv4';

import type {
  astToBlock,
  block,
  wordType,
} from '@/components/pages/Playground/editorLanguageType';
import { gray } from '@/styles/colors';

import type { DragBlockItem } from './ASTToBlock';
import { ASTToBlock } from './ASTToBlock';

type presentialCodeBlockProps = {
  astToBlock: Record<string, astToBlock>;
  block: block;
  languageId: string;
  wordTypes: Record<string, wordType>;
  isDragging: boolean;
};

export const PresentialCodeBlock: FC<presentialCodeBlockProps> = ({
  astToBlock,
  block,
  languageId,
  wordTypes,
  isDragging,
}) => {
  return (
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
        box-shadow: ${isDragging ? '0 0 8px 0.5px rgba(0, 0, 0, 0.06)' : '0'};
        opacity: 1;
        white-space: pre;

        &:hover {
          cursor: pointer;
        }
      `}
    >
      <ASTToBlock
        astToBlock={astToBlock}
        ast={block.ast}
        astPath={[]}
        draggable={false}
        languageId={languageId}
        wordTypes={wordTypes}
        updateAstArray={() => null}
      />
    </div>
  );
};

type codeBlockProps = {
  astToBlock: Record<string, astToBlock>;
  block: block;
  languageId: string;
  wordTypes: Record<string, wordType>;
};

export const CodeBlock: FC<codeBlockProps> = ({
  astToBlock,
  block,
  languageId,
  wordTypes,
}) => {
  const [{ isDragging }, drag, preview] = useDrag<
    DragBlockItem,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      type: 'block',
      item:
        !Array.isArray(block.ast) && block.ast['$astId']
          ? {
              astToBlockProps: {
                ast: block.ast,
                astPath: [],
                astToBlock,
                draggable: false,
                languageId,
                updateAstArray: () => null,
                wordTypes,
              },
              astId:
                typeof block.ast['$astId'] === 'string'
                  ? block.ast['$astId']
                  : '',
              id: uuid(),
              keyName: '',
              source: 'sidebar',
            }
          : undefined,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [block],
  );
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);
  return (
    <div
      css={css`
        /* width: min-content; */
        margin-left: 8px;
      `}
      ref={drag}
    >
      <PresentialCodeBlock
        astToBlock={astToBlock}
        block={block}
        isDragging={isDragging}
        languageId={languageId}
        wordTypes={wordTypes}
      />
    </div>
  );
};
