import { css } from '@emotion/react';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

import type {
  ast,
  editorLanguage,
} from '@/components/pages/Playground/editorLanguageType';
import { gray } from '@/styles/colors';

import { ASTToBlock } from '../CodeBlock/ASTToBlock';
import { DroppableSpace } from './DroppableSpace';

type presentialPlaygroundEditor = {
  astArray: ast[];
  editorLanguage: editorLanguage;
  isDraggingBlock: boolean;
  languageId: string;
  setAstArray: Dispatch<SetStateAction<ast[]>>;
  totalLineCount: number;
};

export const PresentialPlaygroundEditor: FC<presentialPlaygroundEditor> = ({
  astArray,
  editorLanguage,
  isDraggingBlock,
  languageId,
  setAstArray,
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
      <div>
        <div
          css={css`
            width: 100%;
            margin-left: 8px;
          `}
          id="playground-editor"
        >
          <DroppableSpace
            acceptedAstId={editorLanguage.editorRootAST}
            astArray={astArray}
            astPath={[]}
            css={css`
              z-index: ${isDraggingBlock ? '100' : '-100'};
              height: 14px;
              margin-bottom: -14px;
              opacity: 0;
            `}
            keyName={0}
            setAstArray={setAstArray}
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
                key={index}
              >
                <ASTToBlock
                  ast={ast}
                  astArray={astArray}
                  astPath={[index.toString()]}
                  astToBlock={editorLanguage.astToBlock}
                  draggable={true}
                  languageId={languageId}
                  setAstArray={setAstArray}
                  wordTypes={editorLanguage.wordTypes}
                />
              </div>
              <DroppableSpace
                acceptedAstId={editorLanguage.editorRootAST}
                astArray={astArray}
                astPath={[]}
                css={css`
                  z-index: ${isDraggingBlock ? '100' : '-100'};
                  height: 28px;
                  margin-top: -14px;
                  margin-bottom: -14px;
                  opacity: 0;
                `}
                keyName={index + 1}
                setAstArray={setAstArray}
                type="insert"
              />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

type playgroundEditor = {
  isDraggingBlock: boolean;
  editorLanguage: editorLanguage;
  languageId: string;
};

export const PlaygroundEditor: FC<playgroundEditor> = ({
  isDraggingBlock,
  editorLanguage,
  languageId,
}) => {
  const [astArray, setAstArray] = useState<ast[]>([
    {
      $astId: '#?single',
      tagName: 'img',
      attr: { $astId: '#/attr', src: 'a.png', alt: '' },
      children: [],
      text: '',
    },
    {
      $astId: '#?single',
      tagName: 'img',
      attr: { $astId: '#/attr', src: 'a.png' },
      children: [],
      text: '',
    },
  ]);
  const [lineHeight] = useState(28);
  const [totalLineCountState, setTotalLineCountState] = useState(1);
  useEffect(() => {
    const editorHeight =
      document.getElementById('playground-editor')?.clientHeight;
    if (editorHeight) {
      setTotalLineCountState(Math.floor(editorHeight / lineHeight) + 1);
    }
  }, [lineHeight]);

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
      `}
    >
      <PresentialPlaygroundEditor
        astArray={astArray}
        editorLanguage={editorLanguage}
        isDraggingBlock={isDraggingBlock}
        languageId={languageId}
        setAstArray={setAstArray}
        totalLineCount={totalLineCountState}
      />
    </div>
  );
};
