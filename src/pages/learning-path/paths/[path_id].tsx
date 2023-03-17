import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { learningPathProps } from '@/components/pages/LearningPath';
import { LearningPath as LearningPathComponent } from '@/components/pages/LearningPath';
import { fetchLearningContents } from '@/components/pages/LearningPath/fetchLearningContents';

const LearningPath: NextPage<learningPathProps> = (props) => {
  return <LearningPathComponent {...props} />;
};

export default LearningPath;

export const getStaticProps: GetStaticProps<learningPathProps> = async (
  context,
) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }

  if (typeof context.params?.path_id !== 'string') {
    throw new Error('context.params.path_id is not valid');
  }

  const contents = fetchLearningContents();

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'layout',
        'learning-path',
      ])),
      path: contents.paths[context.params.path_id],
      courses: contents.courses,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const contents = fetchLearningContents();

  return {
    paths: Object.keys(contents.paths).map((path) => ({
      params: { path_id: path },
      locale: 'ja',
    })),
    fallback: false,
  };
};
