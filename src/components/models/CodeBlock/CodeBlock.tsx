import { css } from '@emotion/react';
import type { FC } from 'react';
import { useEffect } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';

import type { block } from '@/components/pages/Playground/editorLanguageType';
import { gray } from '@/styles/colors';

import { ASTToBlock } from './ASTToBlock';
import { useBlockDrag } from './useBlockDrag';

type presentialCodeBlockProps = {
  block: block;
};

export const PresentialCodeBlock: FC<presentialCodeBlockProps> = ({
  block,
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
        opacity: 1;
        transition: 0.2s;
        white-space: pre;

        &:hover {
          box-shadow: 0 0 8px 4px rgba(0, 0, 0, 0.06);
          cursor: pointer;
        }
      `}
    >
      <ASTToBlock ast={block.ast} astPath={[]} draggable={false} />
    </div>
  );
};

type codeBlockProps = {
  block: block;
};

export const CodeBlock: FC<codeBlockProps> = ({ block }) => {
  const { drag, preview } = useBlockDrag(block.ast, [], false, 'sidebar');
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
      <PresentialCodeBlock block={block} />
    </div>
  );
};
