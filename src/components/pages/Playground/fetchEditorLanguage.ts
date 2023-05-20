import fs from 'fs';

import type { editorLanguage } from './editorLanguageType';
import { editorLanguageSchema } from './editorLanguageType';

export const fetchEditorLanguage = (languageId: string): editorLanguage => {
  const jsonUrl = `./editor_languages/${languageId}/language.json`;
  if (fs.existsSync(jsonUrl)) {
    const contents = editorLanguageSchema.parse(
      JSON.parse(
        fs.readFileSync(jsonUrl, {
          encoding: 'utf-8',
        }),
      ),
    );
    return contents;
  }
  throw new Error(`${jsonUrl} does not exist.`);
};
