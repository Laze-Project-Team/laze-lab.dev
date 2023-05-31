import fs from 'fs';
import type { JSONSchema7 } from 'jsonschema7';

export const fetchASTTemplate = (languageId: string): JSONSchema7 => {
  const jsonUrl = `./editor_languages/${languageId}/astTemplate.json`;
  if (fs.existsSync(jsonUrl)) {
    const contents = JSON.parse(
      fs.readFileSync(jsonUrl, {
        encoding: 'utf-8',
      }),
    ) as JSONSchema7;
    console.log(contents);
    return contents;
  }
  throw new Error(`${jsonUrl} does not exist.`);
};
