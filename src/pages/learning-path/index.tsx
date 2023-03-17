import fs from 'fs';
import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { LearningPathList as LearningPathListComponent } from '@/components/pages/LearningPath';
import type { learningContents } from '@/components/pages/LearningPath/learningPathType';
import { learningContentsSchema } from '@/components/pages/LearningPath/learningPathType';

type learningPathProps = {
  paths: learningContents['paths'];
};

const LearningPath: NextPage<learningPathProps> = ({ paths }) => {
  return <LearningPathListComponent paths={paths} />;
};

export default LearningPath;

export const getStaticProps: GetStaticProps<learningPathProps> = async (
  context,
) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }

  const contents = learningContentsSchema.parse(
    JSON.parse(
      fs.readFileSync('./contents/learning-path/ja/contents.json', {
        encoding: 'utf-8',
      }),
    ),
  );

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'layout',
        'learning-path',
      ])),
      paths: contents.paths,
    },
  };
};
