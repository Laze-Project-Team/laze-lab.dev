import { css } from '@emotion/react';
import { Navbar } from '@mantine/core';
import type { FC } from 'react';
import { useState } from 'react';

import { useEditorLanguage } from '@/components/pages/Playground/EditorLanguageContext';
import type { editorLanguage } from '@/components/pages/Playground/editorLanguageType';
import { gray } from '@/styles/colors';

import { SiderMain } from './SiderMain';
import { SiderSideButton } from './SiderSideButton';

type presentialPlaygroundSiderProps = {
  editorLanguage: editorLanguage;
  sidebarState: number;
  changeSidebarState: (index: number) => () => void;
};

export const PresentialPlaygroundSider: FC<presentialPlaygroundSiderProps> = ({
  editorLanguage,
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
              blocks={editorLanguage.blocks}
              category={editorLanguage.categories.at(sidebarState)}
            />
          </div>
        </div>
      </Navbar>
    </>
  );
};
export const PlaygroundSider: FC = () => {
  const [sidebarState, setSidebarState] = useState(0);
  const editorLanguage = useEditorLanguage();

  return (
    <PresentialPlaygroundSider
      editorLanguage={editorLanguage}
      sidebarState={sidebarState}
      changeSidebarState={(index: number) => () => {
        setSidebarState(index);
      }}
    />
  );
};
