import { css } from '@emotion/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { Descriptions } from '@/components/functional/Descriptions';
import { PlaygroundLayout } from '@/components/layouts/PlaygroundLayout';
import { PlaygroundSider } from '@/components/layouts/PlaygroundLayout/PlaygroundSider';
import { gray } from '@/styles/colors';

export const PresentialPlayground: FC = () => {
  const [t] = useTranslation(['playground']);

  return (
    <>
      <Descriptions title={t('title')} description={t('description')} />

      <PlaygroundLayout>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={20}>
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
            />
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
      </PlaygroundLayout>
    </>
  );
};

export const Playground: FC = () => {
  return <PresentialPlayground />;
};
