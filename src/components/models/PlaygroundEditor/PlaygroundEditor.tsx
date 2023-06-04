import { css } from '@emotion/react';
import type { FC } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { useEditorLanguage } from '@/components/pages/Playground/EditorLanguageContext';
import type {
  ast,
  editorLanguage,
} from '@/components/pages/Playground/editorLanguageType';
import { gray } from '@/styles/colors';

import { ASTToBlock } from '../CodeBlock/ASTToBlock';
import { BlockDragLayer } from './BlockDragLayer';
import { DroppableSpace } from './DroppableSpace';

type presentialPlaygroundEditor = {
  astArray: ast[];
  editorLanguage: editorLanguage;
  isDraggingBlock: boolean;
  totalLineCount: number;
  updateAstArray: (
    astPath: (string | number)[],
    type: 'edit' | 'insert' | 'delete',
    keyName: string | number,
    value: ast | string,
  ) => void;
};

export const PresentialPlaygroundEditor: FC<presentialPlaygroundEditor> = ({
  astArray,
  editorLanguage,
  isDraggingBlock,
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
              >
                <ASTToBlock
                  ast={ast}
                  astPath={[index]}
                  draggable={true}
                  updateAstArray={updateAstArray}
                />
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
                  updateAstArray={updateAstArray}
                />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

type playgroundEditor = {
  isDraggingBlock: boolean;
};

export const PlaygroundEditor: FC<playgroundEditor> = ({ isDraggingBlock }) => {
  const editorLanguage = useEditorLanguage();
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
      tagName: 'div',
      attr: { $astId: '#/attr', src: 'a.png' },
      children: [],
      text: '',
    },
  ]);
  const updateAstArray = useCallback(
    (
      astPath: (string | number)[],
      type: 'edit' | 'insert' | 'delete',
      keyName: string | number,
      value: ast | string,
    ) => {
      setAstArray((astArray) => {
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
        if (type === 'delete') {
          if (
            Array.isArray(editObject) &&
            typeof keyName === 'number' &&
            typeof value !== 'string' &&
            editObject[keyName]
          ) {
            editObject.splice(keyName, 1);
          }
          if (!Array.isArray(editObject)) {
            delete editObject[keyName];
          }
        }
        return astArray;
      });
    },
    [setAstArray],
  );
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
        updateAstArray={updateAstArray}
      />
      <BlockDragLayer />
    </div>
  );
};
