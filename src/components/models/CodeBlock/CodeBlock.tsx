import { css } from '@emotion/react';
import type { FC } from 'react';
import { useDrag } from 'react-dnd';

import type {
  block,
  wordType,
} from '@/components/pages/Playground/editorLanguageType';
import { checkFixedGrammarType } from '@/components/pages/Playground/editorLanguageType';
import { gray } from '@/styles/colors';

type codeBlockProps = {
  block: block;
  wordTypes: Record<string, wordType>;
};

export const PresentialCodeBlock: FC<codeBlockProps> = ({
  block,
  wordTypes,
}) => {
  return (
    <div
      css={css`
        display: flex;
        width: min-content;
        padding: 8px;
        padding-top: 0;
        padding-bottom: 0;
        border: 2px solid ${gray[2]};
        border-radius: 4px;
        margin-left: 8px;
        box-shadow: 0 0 8px 0.5px rgba(0, 0, 0, 0.06);
        white-space: pre;

        &:hover {
          cursor: pointer;
        }
      `}
    >
      {block.grammar.map((grammar, index) => {
        if (grammar.type === 'fixed' && checkFixedGrammarType(grammar.data)) {
          return (
            <div
              key={`${grammar.data.word}${index}`}
              css={css`
                color: ${wordTypes[grammar.data.wordType]?.color ?? 'black'};
                font-family: Consolas, Arial, sans-serif !important;
              `}
            >
              {grammar.data.word}
            </div>
          );
        }
      })}
    </div>
  );
};

export const CodeBlock: FC<codeBlockProps> = ({ block, wordTypes }) => {
  const [, drag] = useDrag(() => ({
    type: 'block',
  }));
  return (
    <div ref={drag}>
      <PresentialCodeBlock block={block} wordTypes={wordTypes} />
    </div>
  );
};
