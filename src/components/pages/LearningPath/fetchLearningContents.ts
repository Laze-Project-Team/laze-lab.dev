import fs from 'fs';

import type { learningContents } from '@/components/pages/LearningPath/learningPathType';
import { learningContentsSchema } from '@/components/pages/LearningPath/learningPathType';

export const fetchLearningContents = (): learningContents => {
  const contents = learningContentsSchema.parse(
    JSON.parse(
      fs.readFileSync('./contents/learning-path/ja/contents.json', {
        encoding: 'utf-8',
      }),
    ),
  );

  return contents;
};
