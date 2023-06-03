import { css } from '@emotion/react';
import type { FC } from 'react';
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import { uuid } from 'uuidv4';

import type {
  ast,
  astToBlock,
  grammar,
  wordType,
} from '@/components/pages/Playground/editorLanguageType';
import {
  checkFixedGrammarType,
  checkInputGrammarType,
  checkVarAstGrammarType,
  checkVarStringGrammarType,
} from '@/components/pages/Playground/editorLanguageType';
import { gray } from '@/styles/colors';

import { CodeBlockTextInput } from './CodeBlockTextInput';

type presentialFixedASTToBlockProps = {
  word: string;
  wordType: string;
  wordTypes: Record<string, wordType>;
};

export const PresentialFixedASTToBlock: FC<presentialFixedASTToBlockProps> = ({
  word,
  wordType,
  wordTypes,
}) => {
  return (
    <div
      key={`${word}`}
      css={css`
        height: min-content;
        margin-top: auto;
        margin-bottom: auto;
        color: ${wordTypes[wordType]?.color ?? 'black'};
        font-family: Consolas, Arial, sans-serif !important;
      `}
    >
      {word}
    </div>
  );
};

type presentialASTToBlockProps = {
  ast: ast;
  astToBlock: Record<string, astToBlock>;
  astPath: (string | number)[];
  draggable: boolean;
  grammar: grammar;
  languageId: string;
  updateAstArray: (
    astPath: (string | number)[],
    type: 'edit' | 'insert' | 'delete',
    keyName: string | number,
    value: ast | string,
  ) => void;
  wordTypes: Record<string, wordType>;
};

export const PresentialASTToBlock: FC<presentialASTToBlockProps> = ({
  ast,
  astToBlock,
  astPath,
  draggable,
  grammar,
  languageId,
  updateAstArray,
  wordTypes,
}) => {
  if (Array.isArray(ast)) {
    return <div />;
  }
  if (grammar.type === 'fixed' && checkFixedGrammarType(grammar.data)) {
    return (
      <PresentialFixedASTToBlock
        word={grammar.data.word}
        wordType={grammar.data.wordType}
        wordTypes={wordTypes}
      />
    );
  }
  if (grammar.type === 'input' && checkInputGrammarType(grammar.data)) {
    if (grammar.data.inputType === 'string') {
      const varString = ast[grammar.data.var];
      if (varString === undefined) {
        return <div />;
      }
      if (typeof varString !== 'string') {
        return <div />;
      }
      return <CodeBlockTextInput astPath={astPath} defaultValue={varString} />;
    }
  }
  if (grammar.type === 'varAst' && checkVarAstGrammarType(grammar.data)) {
    const childAst = ast[grammar.data.var];
    if (!childAst) {
      return <div />;
    }
    if (typeof childAst === 'string') {
      return <div />;
    }
    if (grammar.data.type && grammar.data.type === 'stringRecord') {
      const keyArray = Object.keys(childAst);
      const newChildAst = keyArray
        .filter((key) => key !== '$astId')
        .reduce<{ $astId: string; $key: string; $value: string }[]>(
          (acc, key) => {
            if (Array.isArray(childAst)) {
              return acc;
            }
            if (!childAst['$astId']) {
              return acc;
            }
            if (typeof childAst['$astId'] !== 'string') {
              return acc;
            }
            if (childAst[key] === undefined) {
              return acc;
            }
            if (typeof childAst[key] !== 'string') {
              return acc;
            }
            return [
              ...acc,
              {
                $astId: childAst['$astId'],
                $key: key,
                $value: childAst[key] as string,
              },
            ];
          },
          [],
        );
      return (
        <ASTToBlock
          ast={newChildAst}
          astPath={[...astPath, grammar.data.var]}
          draggable={draggable}
          astToBlock={astToBlock}
          languageId={languageId}
          updateAstArray={updateAstArray}
          wordTypes={wordTypes}
        />
      );
    }
    return (
      <ASTToBlock
        ast={childAst}
        astPath={[...astPath, grammar.data.var]}
        draggable={draggable}
        astToBlock={astToBlock}
        languageId={languageId}
        updateAstArray={updateAstArray}
        wordTypes={wordTypes}
      />
    );
  }
  if (grammar.type === 'varString' && checkVarStringGrammarType(grammar.data)) {
    const astString = ast[grammar.data.var];
    if (!astString) {
      return <div />;
    }
    if (typeof astString !== 'string') {
      return <div />;
    }
    return (
      <PresentialFixedASTToBlock
        word={astString}
        wordType={grammar.data.wordType}
        wordTypes={wordTypes}
      />
    );
  }
  return <div />;
};

export type DragBlockItem = {
  astToBlockProps: ASTToBlockProps;
  astId: string;
  id: string;
  keyName: number | string;
  source: 'sidebar' | 'editor';
};

export type ASTToBlockProps = {
  ast: ast;
  astToBlock: Record<string, astToBlock>;
  astPath: (string | number)[];
  draggable: boolean;
  languageId: string;
  updateAstArray: (
    astPath: (string | number)[],
    type: 'edit' | 'insert' | 'delete',
    keyName: string | number,
    value: ast | string,
  ) => void;
  wordTypes: Record<string, wordType>;
};

export const ASTToBlock: FC<ASTToBlockProps> = ({
  ast,
  astToBlock,
  astPath,
  draggable,
  languageId,
  updateAstArray,
  wordTypes,
}) => {
  const [hoverState, setHoverState] = useState(false);
  const [{ isDragging }, drag] = useDrag<
    DragBlockItem,
    unknown,
    { isDragging: boolean }
  >(
    () => ({
      type: 'block',
      item:
        !Array.isArray(ast) && ast['$astId']
          ? {
              astToBlockProps: {
                ast,
                astToBlock,
                astPath,
                draggable,
                languageId,
                updateAstArray,
                wordTypes,
              },
              astId: typeof ast['$astId'] === 'string' ? ast['$astId'] : '',
              id: uuid(),
              keyName: astPath.length ? astPath.slice(-1)[0] : 0,
              source: 'editor',
            }
          : undefined,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [ast, astPath],
  );
  if (Array.isArray(ast)) {
    return (
      <>
        {ast.map((astElement, index) => {
          if (Array.isArray(astElement)) {
            return <div key={index} />;
          }
          const astId = astElement['$astId'];
          if (!astId) {
            return <div key={index} />;
          }
          if (typeof astId !== 'string') {
            return <div key={index} />;
          }
          const separatorGrammars = astToBlock[astId].settings?.separator;
          return (
            <div
              css={css`
                display: flex;
                align-items: center;
              `}
              key={index}
            >
              <ASTToBlock
                ast={astElement}
                astToBlock={astToBlock}
                astPath={[...astPath, index]}
                draggable={draggable}
                languageId={languageId}
                updateAstArray={updateAstArray}
                wordTypes={wordTypes}
              />
              {separatorGrammars &&
                index !== ast.length - 1 &&
                separatorGrammars.map((separatorGrammar, index) => (
                  <PresentialASTToBlock
                    ast={{ '': '' }}
                    astToBlock={astToBlock}
                    astPath={[...astPath, index]}
                    draggable={draggable}
                    grammar={separatorGrammar}
                    key={index}
                    languageId={languageId}
                    updateAstArray={updateAstArray}
                    wordTypes={wordTypes}
                  />
                ))}
            </div>
          );
        })}
      </>
    );
  }
  const astId = ast['$astId'];
  if (!astId) {
    return <div />;
  }
  if (typeof astId !== 'string') {
    return <div />;
  }
  const grammars = astToBlock[astId].grammar;

  return (
    <div
      css={css`
        display: ${isDragging ? 'none' : 'flex'};
        align-items: center;
        opacity: ${isDragging ? '0' : '1'};
        white-space: pre;

        ${hoverState ? 'box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);' : ''}
        ${hoverState ? `outline: 2px solid ${gray[2]};` : ''}
        ${hoverState ? `border-radius: 4px;` : ''}
        ${hoverState ? 'cursor: pointer;' : ''}
      `}
      id={astId}
      onMouseOver={
        draggable
          ? (e) => {
              e.stopPropagation();
              setHoverState(true);
            }
          : undefined
      }
      onMouseOut={
        draggable
          ? (e) => {
              e.stopPropagation();
              setHoverState(false);
            }
          : undefined
      }
      ref={draggable ? drag : undefined}
    >
      {grammars.map((grammar, index) => (
        <PresentialASTToBlock
          ast={ast}
          astPath={astPath}
          astToBlock={astToBlock}
          draggable={draggable}
          grammar={grammar}
          key={index}
          languageId={languageId}
          updateAstArray={updateAstArray}
          wordTypes={wordTypes}
        />
      ))}
    </div>
  );
};
