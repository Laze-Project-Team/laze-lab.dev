import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type languageIdContextType = {
  setLanguageId: Dispatch<SetStateAction<string>>;
  languageId: string;
};

export const languageIdContext = createContext<languageIdContextType | null>(
  null,
);

export const useLanguageId = (): languageIdContextType => {
  const languageId = useContext(languageIdContext);

  if (languageId === null) {
    throw new Error('Please wrap component with LanguageIdProvider');
  }

  return languageId;
};

type languageIdProviderProps = {
  children: ReactNode;
  defaultLanguageId?: string;
};

export const LanguageIdProvider: FC<languageIdProviderProps> = ({
  children,
  defaultLanguageId,
}) => {
  const [languageId, setLanguageId] = useState<string>(
    // preferTheme ?? prefersDarkMode ? 'dark' : 'light',
    defaultLanguageId ?? 'html',
  );

  useEffect(() => {
    if (defaultLanguageId !== undefined) {
      setLanguageId(defaultLanguageId);
    }
  }, [defaultLanguageId]);

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      setLanguageId,
      languageId,
    }),
    [languageId],
  );

  return (
    <languageIdContext.Provider value={colorMode}>
      {children}
    </languageIdContext.Provider>
  );
};
