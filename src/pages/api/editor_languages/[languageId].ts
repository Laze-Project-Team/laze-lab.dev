// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';

import type { editorLanguage } from '@/components/pages/Playground/editorLanguageType';
import { fetchEditorLanguage } from '@/components/pages/Playground/fetchEditorLanguage';

const handler: NextApiHandler<editorLanguage> = async (req, res) => {
  const { languageId } = req.query;

  if (typeof languageId === 'string') {
    const language = fetchEditorLanguage(languageId);

    res.status(200).json(language);
    return;
  }
  res.status(404);
  return;
};

export default handler;
