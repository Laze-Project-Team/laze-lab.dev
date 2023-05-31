// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { JSONSchema7 } from 'jsonschema7';
import type { NextApiHandler } from 'next';

import { fetchASTTemplate } from '@/components/pages/Playground/fetchASTTemplate';

const handler: NextApiHandler<JSONSchema7> = async (req, res) => {
  const { languageId } = req.query;

  if (typeof languageId === 'string') {
    const astTemplate = fetchASTTemplate(languageId);

    res.status(200).json(astTemplate);
    return;
  }
  res.status(404);
  return;
};

export default handler;
