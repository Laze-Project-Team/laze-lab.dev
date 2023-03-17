import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { learningStepProps } from '@/components/pages/LearningPath';
import { LearningStep as LearningStepComponent } from '@/components/pages/LearningPath';
import { fetchLearningContents } from '@/components/pages/LearningPath/fetchLearningContents';

const LearningPath: NextPage<learningStepProps> = (props) => {
  return <LearningStepComponent {...props} />;
};

export default LearningPath;

export const getStaticProps: GetStaticProps<learningStepProps> = async (
  context,
) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }

  if (typeof context.params?.step_id !== 'string') {
    throw new Error('context.params.step_id is not valid');
  }

  const contents = fetchLearningContents();

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'layout',
        'learning-path',
      ])),
      step: contents.steps[context.params.step_id],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const contents = fetchLearningContents();

  return {
    paths: Object.keys(contents.steps).map((step) => ({
      params: { step_id: step },
      locale: 'ja',
    })),
    fallback: false,
  };
};
