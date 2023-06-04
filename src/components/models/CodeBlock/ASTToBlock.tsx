import { css } from '@emotion/react';
import type { FC } from 'react';
import { useState } from 'react';

import { useEditorLanguage } from '@/components/pages/Playground/EditorLanguageContext';
import type {
  ast,
  grammar,
  wordType,
} from '@/components/pages/Playground/editorLanguageType';
import {
  checkFixedGrammarType,
  checkInputGrammarType,
  checkVarAstGrammarType,
  checkVarStringGrammarType,
} from '@/components/pages/Playground/editorLanguageType';
import { useIsDraggingBlock } from '@/components/pages/Playground/IsDraggingBlockContext';
import { gray } from '@/styles/colors';

import { CodeBlockTextInput } from './CodeBlockTextInput';
import { useBlockDrag } from './useBlockDrag';

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
  astPath: (string | number)[];
  draggable: boolean;
  grammar: grammar;
  wordTypes: Record<string, wordType>;
};

export const PresentialASTToBlock: FC<presentialASTToBlockProps> = ({
  ast,
  astPath,
  draggable,
  grammar,
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
        />
      );
    }
    return (
      <ASTToBlock
        ast={childAst}
        astPath={[...astPath, grammar.data.var]}
        draggable={draggable}
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

export type ASTToBlockProps = {
  ast: ast;
  astPath: (string | number)[];
  draggable: boolean;
};

export const ASTToBlock: FC<ASTToBlockProps> = ({
  ast,
  astPath,
  draggable,
}) => {
  const { astToBlock, wordTypes } = useEditorLanguage();
  const [hoverState, setHoverState] = useState(false);
  const { isDragging, drag } = useBlockDrag(ast, astPath, draggable, 'editor');
  const isDraggingBlock = useIsDraggingBlock();

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
                astPath={[...astPath, index]}
                draggable={draggable}
              />
              {separatorGrammars &&
                index !== ast.length - 1 &&
                separatorGrammars.map((separatorGrammar, index) => (
                  <PresentialASTToBlock
                    ast={{ '': '' }}
                    astPath={[...astPath, index]}
                    draggable={draggable}
                    grammar={separatorGrammar}
                    key={index}
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

        ${!isDraggingBlock && hoverState
          ? 'box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.2);'
          : ''}
        ${!isDraggingBlock && hoverState
          ? `outline: 2px solid ${gray[2]};`
          : ''}
        ${!isDraggingBlock && hoverState ? `border-radius: 4px;` : ''}
        ${!isDraggingBlock && hoverState ? 'cursor: pointer;' : ''}
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
          draggable={draggable}
          grammar={grammar}
          key={index}
          wordTypes={wordTypes}
        />
      ))}
    </div>
  );
};
