import { css } from '@emotion/react';
import type { Dispatch, FC, SetStateAction } from 'react';
import { useState } from 'react';
import { useDrag } from 'react-dnd';

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
  astArray: ast[];
  astToBlock: Record<string, astToBlock>;
  astPath: (string | number)[];
  draggable: boolean;
  grammar: grammar;
  languageId: string;
  setAstArray: Dispatch<SetStateAction<ast[]>>;
  wordTypes: Record<string, wordType>;
};

export const PresentialASTToBlock: FC<presentialASTToBlockProps> = ({
  ast,
  astArray,
  astToBlock,
  astPath,
  draggable,
  grammar,
  languageId,
  setAstArray,
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
      return <CodeBlockTextInput defaultValue={varString} />;
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
          astArray={astArray}
          astPath={[...astPath, grammar.data.var]}
          draggable={draggable}
          astToBlock={astToBlock}
          languageId={languageId}
          setAstArray={setAstArray}
          wordTypes={wordTypes}
        />
      );
    }
    return (
      <ASTToBlock
        ast={childAst}
        astArray={astArray}
        astPath={[...astPath, grammar.data.var]}
        draggable={draggable}
        astToBlock={astToBlock}
        languageId={languageId}
        setAstArray={setAstArray}
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
  ast: ast;
  astId: string;
};

type ASTToBlockProps = {
  ast: ast;
  astArray: ast[];
  astToBlock: Record<string, astToBlock>;
  astPath: (string | number)[];
  draggable: boolean;
  languageId: string;
  setAstArray: Dispatch<SetStateAction<ast[]>>;
  wordTypes: Record<string, wordType>;
};

export const ASTToBlock: FC<ASTToBlockProps> = ({
  ast,
  astArray,
  astToBlock,
  astPath,
  draggable,
  languageId,
  setAstArray,
  wordTypes,
}) => {
  const [hoverState, setHoverState] = useState(false);
  const [, drag] = useDrag<DragBlockItem>(() => ({
    type: 'block',
    item:
      !Array.isArray(ast) && ast['$astId']
        ? {
            ast: ast,
            astId: typeof ast['$astId'] === 'string' ? ast['$astId'] : '',
          }
        : undefined,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
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
                astArray={astArray}
                astToBlock={astToBlock}
                astPath={[...astPath, index.toString()]}
                draggable={draggable}
                languageId={languageId}
                setAstArray={setAstArray}
                wordTypes={wordTypes}
              />
              {separatorGrammars &&
                index !== ast.length - 1 &&
                separatorGrammars.map((separatorGrammar, index) => (
                  <PresentialASTToBlock
                    ast={[]}
                    astArray={astArray}
                    astToBlock={astToBlock}
                    astPath={[...astPath, index.toString()]}
                    draggable={draggable}
                    grammar={separatorGrammar}
                    key={index}
                    languageId={languageId}
                    setAstArray={setAstArray}
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
        display: flex;
        align-items: center;
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
          astArray={astArray}
          astPath={astPath}
          astToBlock={astToBlock}
          draggable={draggable}
          grammar={grammar}
          key={index}
          languageId={languageId}
          setAstArray={setAstArray}
          wordTypes={wordTypes}
        />
      ))}
    </div>
  );
};
