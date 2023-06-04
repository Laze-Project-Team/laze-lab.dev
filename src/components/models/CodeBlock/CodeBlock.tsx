import { css } from '@emotion/react';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { uuid } from 'uuidv4';

import { useEditorLanguage } from '@/components/pages/Playground/EditorLanguageContext';
import type { block } from '@/components/pages/Playground/editorLanguageType';
import { useLanguageId } from '@/components/pages/Playground/LanguageIdContext';
import { gray } from '@/styles/colors';

import type { DragBlockItem } from './ASTToBlock';
import { ASTToBlock } from './ASTToBlock';

type presentialCodeBlockProps = {
  block: block;
  isDragging: boolean;
};

export const PresentialCodeBlock: FC<presentialCodeBlockProps> = ({
  block,
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
        ast={block.ast}
        astPath={[]}
        draggable={false}
        updateAstArray={() => null}
      />
    </div>
  );
};

type codeBlockProps = {
  block: block;
};

export const CodeBlock: FC<codeBlockProps> = ({ block }) => {
  const { astToBlock, wordTypes } = useEditorLanguage();
  const { languageId } = useLanguageId();
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
        margin-left: 8px;
      `}
      ref={drag}
    >
      <PresentialCodeBlock block={block} isDragging={isDragging} />
    </div>
  );
};
