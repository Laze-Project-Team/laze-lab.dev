import { css } from '@emotion/react';
import { Loader } from '@mantine/core';
import type { FC } from 'react';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import useSWR from 'swr';

import { Descriptions } from '@/components/functional/Descriptions';
import { PlaygroundLayout } from '@/components/layouts/PlaygroundLayout';
import { PlaygroundEditor } from '@/components/models/PlaygroundEditor';
import { PlaygroundSider } from '@/components/models/PlaygroundSider';
import { gray } from '@/styles/colors';

import type { editorLanguage } from './editorLanguageType';

type playgroundProps = {
  editorLanguage: editorLanguage;
};

export const PresentialPlayground: FC<playgroundProps> = ({
  editorLanguage,
}) => {
  const [t] = useTranslation(['playground']);

  return (
    <>
      <Descriptions title={t('title')} description={t('description')} />

      <PlaygroundLayout>
        <DndProvider backend={HTML5Backend}>
          <PanelGroup direction="horizontal">
            <Panel defaultSize={20} minSize={20}>
              <PlaygroundSider editorLanguage={editorLanguage} />
            </Panel>
            <PanelResizeHandle
              css={css`
                width: 2px;
                background-color: ${gray[1]};
                box-shadow: 1px 0 2px 0.1px rgba(0, 0, 0, 0.04);
                transition: 0.2s;

                &:hover {
                  width: 8px;
                  background-color: ${gray[2]};
                  opacity: 100;
                }

                &:active {
                  background-color: ${gray[4]};
                  box-shadow: 0 0 8px 0.25px rgba(0, 0, 0, 0.06);
                }
              `}
            />
            <Panel defaultSize={50}>
              <div
                css={css`
                  width: 100%;
                  height: 100%;
                `}
              >
                <PlaygroundEditor />
              </div>
            </Panel>
            <PanelResizeHandle
              css={css`
                width: 4px;
                background-color: ${gray[1]};
                transition: 0.1s;

                &:hover {
                  width: 8px;
                  background-color: ${gray[2]};
                }

                &:active {
                  background-color: ${gray[4]};
                  box-shadow: 0 0 8px 0.25px rgba(0, 0, 0, 0.06);
                }
              `}
            />
            <Panel defaultSize={30}>
              <div
                css={css`
                  width: 100%;
                  height: 100%;
                `}
              />
            </Panel>
          </PanelGroup>
        </DndProvider>
      </PlaygroundLayout>
    </>
  );
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const Playground: FC = () => {
  const [languageState] = useState('html');
  const { data: editorLanguage, isLoading } = useSWR(
    `/api/editor_languages/${languageState}`,
    fetcher,
  );
  if (isLoading) {
    return (
      <div
        css={css`
          display: flex;
          width: 100vw;
          height: 100vh;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        `}
      >
        <div
          css={css`
            margin-bottom: 16px;
            color: ${gray[5]};
            font-size: 1.7rem;
            font-weight: 600;
          `}
        >
          エディターをロード中...
        </div>
        <Loader size={'xl'} />
      </div>
    );
  }
  return <PresentialPlayground editorLanguage={editorLanguage} />;
};
