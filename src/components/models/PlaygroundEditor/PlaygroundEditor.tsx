import { css } from '@emotion/react';
import type { FC } from 'react';
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
  totalLineCount: number;
  updateAstArray: (
    astPath: (string | number)[],
    type: 'edit' | 'insert',
    keyName: string | number,
    value: ast | string,
  ) => void;
};

export const PresentialPlaygroundEditor: FC<presentialPlaygroundEditor> = ({
  astArray,
  editorLanguage,
  isDraggingBlock,
  languageId,
  totalLineCount,
  updateAstArray,
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
            astPath={[]}
            css={css`
              z-index: ${isDraggingBlock ? '100' : '-100'};
              height: 14px;
              margin-bottom: -14px;
              opacity: 0;
            `}
            keyName={0}
            type="insert"
            updateAstArray={updateAstArray}
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
                  astPath={[index.toString()]}
                  astToBlock={editorLanguage.astToBlock}
                  draggable={true}
                  languageId={languageId}
                  updateAstArray={updateAstArray}
                  wordTypes={editorLanguage.wordTypes}
                />
              </div>
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
                updateAstArray={updateAstArray}
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
  const updateAstArray = (
    astPath: (string | number)[],
    type: 'edit' | 'insert',
    keyName: string | number,
    value: ast | string,
  ) => {
    const editObject = astPath.reduce<ast>((accAst, currKey) => {
      if (!Array.isArray(accAst)) {
        const newEditObject = accAst[currKey];
        if (typeof newEditObject === 'string') {
          console.error(`${newEditObject} is a string.`);
          return accAst;
        }
        return newEditObject;
      }
      if (Array.isArray(accAst) && typeof currKey === 'number') {
        return accAst[currKey];
      }
      if (typeof currKey === 'number') {
        console.error(`${accAst} is not an array.`);
        return accAst;
      }
      return accAst;
    }, astArray);
    if (type === 'edit') {
      if (
        Array.isArray(editObject) &&
        typeof keyName === 'number' &&
        typeof value !== 'string'
      ) {
        editObject[keyName] = value;
      }
      if (!Array.isArray(editObject) && typeof keyName === 'string') {
        editObject[keyName] = value;
      }
    }
    if (type === 'insert') {
      if (
        Array.isArray(editObject) &&
        typeof keyName === 'number' &&
        typeof value !== 'string'
      ) {
        editObject.splice(keyName, 0, value);
      }
      if (!Array.isArray(editObject)) {
        editObject[keyName] = value;
      }
    }
    setAstArray(astArray);
  };
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
        totalLineCount={totalLineCountState}
        updateAstArray={updateAstArray}
      />
    </div>
  );
};
