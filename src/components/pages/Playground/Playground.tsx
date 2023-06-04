import { css } from '@emotion/react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { Descriptions } from '@/components/functional/Descriptions';
import { PlaygroundLayout } from '@/components/layouts/PlaygroundLayout';
import { PlaygroundEditor } from '@/components/models/PlaygroundEditor';
import { PlaygroundSider } from '@/components/models/PlaygroundSider';
import { gray } from '@/styles/colors';

import { EditorLanguageProvider } from './EditorLanguageContext';
import { LanguageIdProvider } from './LanguageIdContext';

export const PresentialPlayground: FC = () => {
  const [t] = useTranslation(['playground']);
  const [isDraggingBlockState, setIsDraggingBlockState] = useState(false);
  useEffect(() => {
    window.addEventListener('dragover', () => {
      setIsDraggingBlockState(true);
    });
    window.addEventListener('dragend', () => {
      setIsDraggingBlockState(false);
    });
  }, []);

  return (
    <>
      <Descriptions title={t('title')} description={t('description')} />

      <PlaygroundLayout>
        <DndProvider backend={HTML5Backend}>
          <PanelGroup direction="horizontal">
            <Panel defaultSize={20} minSize={20}>
              <PlaygroundSider />
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
                <PlaygroundEditor isDraggingBlock={isDraggingBlockState} />
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

export const Playground: FC = () => {
  return (
    <LanguageIdProvider defaultLanguageId="html">
      <EditorLanguageProvider>
        <PresentialPlayground />
      </EditorLanguageProvider>
    </LanguageIdProvider>
  );
};
