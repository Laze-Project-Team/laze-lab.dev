import { css } from '@emotion/react';
import type { FC } from 'react';

import type {
  block,
  category,
} from '@/components/pages/Playground/editorLanguageType';
import { gray } from '@/styles/colors';

import { CodeBlock } from '../CodeBlock/CodeBlock';

type presentialSiderMainProps = {
  blocks: Record<string, block>;
  category: category;
};

export const PresentialSiderMain: FC<presentialSiderMainProps> = ({
  blocks,
  category,
}) => {
  return (
    <div
      css={css`
        padding: 8px;
      `}
    >
      <div
        css={css`
          margin-bottom: 8px;
          color: #555;
          font-size: 1rem;
          font-weight: 500;
        `}
      >
        {category.descriptiveTitle}
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        {category.blocks.map((blockId, index) => {
          const block = blocks[blockId];
          if (block) {
            return (
              <div
                css={css`
                  padding: 8px;
                  padding-top: 4px;
                  border: 1px solid ${gray[2]};
                  border-radius: 4px;
                  margin-bottom: 8px;
                `}
                key={block.id}
              >
                <div
                  css={css`
                    font-size: 0.85rem;
                  `}
                >
                  - {block.title}
                </div>
                <div
                  css={css`
                    padding-left: 8px;
                    margin-bottom: 8px;
                    color: ${gray[6]};
                    font-size: 0.7rem;
                  `}
                >
                  {block.description}
                </div>
                <CodeBlock block={block} />
              </div>
            );
          } else {
            return <div key={index} />;
          }
        })}
      </div>
    </div>
  );
};

type siderMainProps = {
  blocks: Record<string, block>;
  category?: category;
};

export const SiderMain: FC<siderMainProps> = ({ blocks, category }) => {
  if (!category) {
    return (
      <div
        css={css`
          padding: 16px;
        `}
      >
        <div>なし</div>
      </div>
    );
  }
  return <PresentialSiderMain blocks={blocks} category={category} />;
};
