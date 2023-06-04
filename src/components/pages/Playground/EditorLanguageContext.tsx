import { css } from '@emotion/react';
import { Loader } from '@mantine/core';
import type { FC, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

import { gray } from '@/styles/colors';

import type { editorLanguage } from './editorLanguageType';
import { useLanguageId } from './LanguageIdContext';

export const editorLanguageContext = createContext<editorLanguage | null>(null);

export const useEditorLanguage = (): editorLanguage => {
  const editorLanguage = useContext(editorLanguageContext);

  if (editorLanguage === null) {
    throw new Error('Please wrap component with EditorLanguageProvider');
  }

  return editorLanguage;
};

type editorLanguageProviderProps = {
  children: ReactNode;
};

export const EditorLanguageProvider: FC<editorLanguageProviderProps> = ({
  children,
}) => {
  const { languageId } = useLanguageId();
  const { data: editorLanguage, isLoading } = useSWR<editorLanguage>(
    `/api/editor_languages/${languageId}`,
    (url: string) => fetch(url).then((r) => r.json()),
  );

  if (isLoading || !editorLanguage) {
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

  return (
    <editorLanguageContext.Provider value={editorLanguage}>
      {children}
    </editorLanguageContext.Provider>
  );
};
