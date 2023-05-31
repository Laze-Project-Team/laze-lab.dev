import type { Dispatch, SetStateAction } from 'react';

import type { ast } from '@/components/pages/Playground/editorLanguageType';

export const updateAstArray = (
  astArray: ast[],
  setAstArray: Dispatch<SetStateAction<ast[]>>,
  astPath: (string | number)[],
  type: 'edit' | 'insert',
  keyName: string | number,
  value: ast | string,
): void => {
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
      console.log(editObject);
      console.log(astArray);
    }
    if (!Array.isArray(editObject)) {
      editObject[keyName] = value;
    }
  }
  setAstArray(astArray);
};
