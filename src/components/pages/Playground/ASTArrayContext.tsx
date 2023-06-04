import type { FC, ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

import type { ast } from '@/components/pages/Playground/editorLanguageType';

export type astArrayContextType = {
  updateAstArray: (
    astPath: (string | number)[],
    type: 'edit' | 'insert' | 'delete',
    keyName: string | number,
    value: ast | string,
    keyDict?: {
      $key: string;
      $value: string;
    },
  ) => void;
  astArray: ast[];
};

export const astArrayContext = createContext<astArrayContextType | null>(null);

export const useAstArray = (): astArrayContextType => {
  const astArray = useContext(astArrayContext);

  if (astArray === null) {
    throw new Error('Please wrap component with ASTArrayProvider');
  }

  return astArray;
};

type astArrayProviderProps = {
  children: ReactNode;
};

export const ASTArrayProvider: FC<astArrayProviderProps> = ({ children }) => {
  const [astArray, setAstArray] = useState<ast[]>([]);
  const updateAstArray = useCallback(
    (
      astPath: (string | number)[],
      type: 'edit' | 'insert' | 'delete',
      keyName: string | number,
      value: ast | string,
      keyDict?: {
        $key: string;
        $value: string;
      },
    ) => {
      setAstArray((astArray) => {
        const editObject = astPath.reduce<ast>((accAst, currKey) => {
          if (!Array.isArray(accAst)) {
            const newEditObject = accAst[currKey];
            if (typeof newEditObject === 'string') {
              console.error(`${newEditObject} is a string.`);
              return accAst;
            }
            return newEditObject;
          }
          if (Array.isArray(accAst) && typeof currKey === 'number') {
            return accAst[currKey];
          }
          if (typeof currKey === 'number') {
            console.error(`${accAst} is not an array.`);
            return accAst;
          }
          return accAst;
        }, astArray);
        if (type === 'edit') {
          if (
            Array.isArray(editObject) &&
            typeof keyName === 'number' &&
            typeof value !== 'string'
          ) {
            editObject[keyName] = value;
          }
          if (!Array.isArray(editObject) && typeof keyName === 'string') {
            if (keyName === '$value' && keyDict && keyDict['$value']) {
              editObject[keyDict['$value']] = value;
              return astArray;
            }
            if (
              keyName === '$key' &&
              keyDict &&
              keyDict['$key'] &&
              typeof value === 'string'
            ) {
              editObject[keyDict['$key']] = editObject[value];
              delete editObject[value];
              return astArray;
            }
            editObject[keyName] = value;
          }
        }
        if (type === 'insert') {
          if (
            Array.isArray(editObject) &&
            typeof keyName === 'number' &&
            typeof value !== 'string'
          ) {
            editObject.splice(keyName, 0, value);
          }
          if (!Array.isArray(editObject)) {
            editObject[keyName] = value;
          }
        }
        if (type === 'delete') {
          if (
            Array.isArray(editObject) &&
            typeof keyName === 'number' &&
            typeof value !== 'string' &&
            editObject[keyName]
          ) {
            editObject.splice(keyName, 1);
          }
          if (!Array.isArray(editObject)) {
            delete editObject[keyName];
          }
        }
        return astArray;
      });
    },
    [setAstArray],
  );

  return (
    <astArrayContext.Provider value={{ astArray, updateAstArray }}>
      {children}
    </astArrayContext.Provider>
  );
};
