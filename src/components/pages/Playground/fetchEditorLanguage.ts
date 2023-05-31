import fs from 'fs';

import type { editorLanguage } from './editorLanguageType';
import { editorLanguageSchema } from './editorLanguageType';

export const fetchEditorLanguage = (languageId: string): editorLanguage => {
  const jsonUrl = `./editor_languages/${languageId}/settings.json`;
  if (fs.existsSync(jsonUrl)) {
    try {
      const json = JSON.parse(
        fs.readFileSync(jsonUrl, {
          encoding: 'utf-8',
        }),
      );
      const contents = editorLanguageSchema.parse(json);
      return contents;
    } catch (e) {
      console.error(e);
      throw new Error(`Failed to parse with editorLanguageSchema`);
    }
  }
  throw new Error(`${jsonUrl} does not exist.`);
};
