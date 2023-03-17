import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { learningCourseProps } from '@/components/pages/LearningPath';
import { LearningCourse as LearningCourseComponent } from '@/components/pages/LearningPath';
import { fetchLearningContents } from '@/components/pages/LearningPath/fetchLearningContents';

const LearningCourse: NextPage<learningCourseProps> = (props) => {
  return <LearningCourseComponent {...props} />;
};

export default LearningCourse;

export const getStaticProps: GetStaticProps<learningCourseProps> = async (
  context,
) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }
  if (typeof context.params?.course_id !== 'string') {
    throw new Error('context.params.course_id is not valid');
  }

  const contents = fetchLearningContents();

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'layout',
        'learning-path',
      ])),
      course: contents.courses[context.params.course_id],
      steps: contents.steps,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const contents = fetchLearningContents();

  return {
    paths: Object.keys(contents.courses).map((course) => ({
      params: { course_id: course },
      locale: 'ja',
    })),
    fallback: false,
  };
};
