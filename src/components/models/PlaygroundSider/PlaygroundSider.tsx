import { css } from '@emotion/react';
import { Navbar } from '@mantine/core';
import type { FC } from 'react';
import { useState } from 'react';

import type { editorLanguage } from '@/components/pages/Playground/editorLanguageType';
import { gray } from '@/styles/colors';

import { SiderMain } from './SiderMain';
import { SiderSideButton } from './SiderSideButton';

type presentialPlaygroundSiderProps = {
  editorLanguage: editorLanguage;
  languageId: string;
  sidebarState: number;
  changeSidebarState: (index: number) => () => void;
};

export const PresentialPlaygroundSider: FC<presentialPlaygroundSiderProps> = ({
  editorLanguage,
  languageId,
  sidebarState,
  changeSidebarState,
}) => {
  return (
    <>
      <Navbar
        css={css`
          z-index: 5;
          width: 100%;
          height: 100%;
          border-right: 1px solid ${gray[1]};
          box-shadow: 1px 0 2px 0.25px rgba(0, 0, 0, 0.06);
        `}
      >
        <div
          css={css`
            display: flex;
            height: 100%;
          `}
        >
          <div
            css={css`
              width: 60px;
              height: 100%;
              background-color: ${gray[1]};
            `}
          >
            {editorLanguage.categories.map((category, index) => (
              <SiderSideButton
                category={category}
                changeSidebarState={changeSidebarState(index)}
                selected={index === sidebarState}
                key={category.id}
              />
            ))}
          </div>
          <div
            css={css`
              width: calc(100% - 60px);
            `}
          >
            <SiderMain
              astToBlock={editorLanguage.astToBlock}
              blocks={editorLanguage.blocks}
              category={editorLanguage.categories.at(sidebarState)}
              languageId={languageId}
              wordTypes={editorLanguage.wordTypes}
            />
          </div>
        </div>
      </Navbar>
    </>
  );
};

type playgroundSiderProps = {
  editorLanguage: editorLanguage;
  languageId: string;
};

export const PlaygroundSider: FC<playgroundSiderProps> = ({
  editorLanguage,
  languageId,
}) => {
  const [sidebarState, setSidebarState] = useState(0);

  return (
    <PresentialPlaygroundSider
      editorLanguage={editorLanguage}
      languageId={languageId}
      sidebarState={sidebarState}
      changeSidebarState={(index: number) => () => {
        setSidebarState(index);
      }}
    />
  );
};
