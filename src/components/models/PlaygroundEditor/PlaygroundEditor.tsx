import { css } from '@emotion/react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { useAstArray } from '@/components/pages/Playground/ASTArrayContext';
import { useEditorLanguage } from '@/components/pages/Playground/EditorLanguageContext';
import type {
  ast,
  editorLanguage,
} from '@/components/pages/Playground/editorLanguageType';
import { useIsDraggingBlock } from '@/components/pages/Playground/IsDraggingBlockContext';
import { gray } from '@/styles/colors';

import { ASTToBlock } from '../CodeBlock/ASTToBlock';
import { BlockDragLayer } from './BlockDragLayer';
import { DroppableSpace } from './DroppableSpace';

type presentialPlaygroundEditor = {
  astArray: ast[];
  editorLanguage: editorLanguage;
  isDraggingBlock: boolean;
  totalLineCount: number;
};

export const PresentialPlaygroundEditor: FC<presentialPlaygroundEditor> = ({
  astArray,
  editorLanguage,
  isDraggingBlock,
  totalLineCount,
}) => {
  return (
    <div
      css={css`
        display: flex;
        height: 100%;
      `}
    >
      <div
        css={css`
          width: 40px;
          height: 100%;
          padding-right: 4px;
          border-right: 1px solid ${gray[2]};
        `}
      >
        {[...Array(totalLineCount).keys()].map((val) => (
          <div
            css={css`
              color: ${gray[6]};
              font-family: Consolas, Arial, Helvetica, sans-serif;
              font-size: 1rem;
              line-height: 28px;
              text-align: right;
            `}
            key={val}
          >
            {val + 1}
          </div>
        ))}
      </div>
      <div
        css={css`
          flex: 1;
        `}
      >
        <div
          css={css`
            width: 100%;
            padding-left: 8px;
          `}
          id="playground-editor"
        >
          <DroppableSpace
            acceptedAstId={editorLanguage.editorRootAST}
            astPath={[]}
            css={css`
              z-index: ${isDraggingBlock ? '100' : '-100'};
              height: 14px;
              margin-bottom: -14px;
              opacity: 0;
            `}
            keyName={0}
            type="insert"
          />
          {astArray.map((ast, index) => (
            <>
              <div
                css={css`
                  display: flex;
                  width: min-content;
                  align-items: center;
                  line-height: 28px;
                `}
              >
                <ASTToBlock ast={ast} astPath={[index]} draggable={true} />
              </div>
              <div
                css={css`
                  z-index: ${isDraggingBlock ? '100' : '-100'};
                `}
              >
                <DroppableSpace
                  acceptedAstId={editorLanguage.editorRootAST}
                  astPath={[]}
                  css={css`
                    z-index: ${isDraggingBlock ? '100' : '-100'};
                    height: 28px;
                    margin-top: -14px;
                    margin-bottom: -14px;
                    opacity: 0;
                  `}
                  keyName={index + 1}
                  type="insert"
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PlaygroundEditor: FC = () => {
  const editorLanguage = useEditorLanguage();

  const { astArray } = useAstArray();
  const isDraggingBlock = useIsDraggingBlock();

  const [lineHeight] = useState(28);
  const [totalLineCountState, setTotalLineCountState] = useState(1);
  useEffect(() => {
    const editorHeight =
      document.getElementById('playground-editor')?.clientHeight;
    if (editorHeight) {
      setTotalLineCountState(
        Math.floor((editorHeight - lineHeight / 2) / lineHeight) + 1,
      );
    }
  }, [lineHeight, astArray, isDraggingBlock]);

  return (
    <div
      css={css`
        overflow: auto;
        width: 100%;
        height: 100%;

        &::-webkit-scrollbar {
          width: 12px;
          border-left: 1px solid ${gray[2]};
        }

        &::-webkit-scrollbar-thumb {
          width: 8px;
          background-color: ${gray[4]};
        }

        &::-webkit-scrollbar-thumb:hover {
          width: 8px;
          background-color: ${gray[5]};
        }

        &::-webkit-scrollbar-thumb:active {
          width: 8px;
          background-color: ${gray[6]};
        }
      `}
    >
      <PresentialPlaygroundEditor
        astArray={astArray}
        editorLanguage={editorLanguage}
        isDraggingBlock={isDraggingBlock}
        totalLineCount={totalLineCountState}
      />
      <BlockDragLayer />
    </div>
  );
};
