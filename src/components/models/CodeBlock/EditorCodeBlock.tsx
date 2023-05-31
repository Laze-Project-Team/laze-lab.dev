import { css } from '@emotion/react';
import type { FC } from 'react';
import { useDrag } from 'react-dnd';

import type {
  ast,
  astToBlock,
  wordType,
} from '@/components/pages/Playground/editorLanguageType';

import { ASTToBlock } from './ASTToBlock';

type presentialEditorCodeBlockProps = {
  ast: ast;
  astToBlock: Record<string, astToBlock>;
  languageId: string;
  wordTypes: Record<string, wordType>;
};

export const PresentialEditorCodeBlock: FC<presentialEditorCodeBlockProps> = ({
  ast,
  astToBlock,
  languageId,
  wordTypes,
}) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        margin-top: auto;
        margin-bottom: auto;
        white-space: pre;
      `}
    >
      <ASTToBlock
        ast={ast}
        astToBlock={astToBlock}
        draggable={true}
        languageId={languageId}
        wordTypes={wordTypes}
      />
    </div>
  );
};

type editorCodeBlockProps = {
  astToBlock: Record<string, astToBlock>;
  ast: ast;
  languageId: string;
  wordTypes: Record<string, wordType>;
};

export const EditorCodeBlock: FC<editorCodeBlockProps> = ({
  ast,
  astToBlock,
  languageId,
  wordTypes,
}) => {
  const [, drag] = useDrag(() => ({
    type: 'block',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      css={css`
        width: min-content;
        margin-left: 8px;
      `}
      ref={drag}
    >
      <PresentialEditorCodeBlock
        ast={ast}
        astToBlock={astToBlock}
        languageId={languageId}
        wordTypes={wordTypes}
      />
    </div>
  );
};
