import { css } from '@emotion/react';
import { Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { Fragment } from 'react';

import { Descriptions } from '@/components/functional/Descriptions';
import { IndexLayout } from '@/components/layouts/IndexLayout';
import { pagesPath } from '@/lib/$path';

import type { learningContents, learningPath } from './learningPathType';

export type learningPathProps = {
  path: learningPath;
  courses: learningContents['courses'];
};

export type presentialLearningPathProps = learningPathProps;

export const PresentialLearningPath: FC<presentialLearningPathProps> = ({
  path,
  courses,
}) => {
  const [t] = useTranslation('learning-path');

  return (
    <>
      <Descriptions title={t('title')} description={t('description')} />

      <IndexLayout>
        <h1
          css={css`
            margin-bottom: 16px;
          `}
        >
          {path.title}
        </h1>
        <p
          css={css`
            margin-bottom: 32px;
          `}
        >
          {path.description}
        </p>

        <div
          css={css`
            display: flex;
            flex-direction: column;
          `}
        >
          {path.courses.map((courseId, i) => {
            const course = courses[courseId];
            return (
              <Fragment key={courseId}>
                {i > 0 && (
                  <div
                    css={css`
                      height: 32px;
                      border-left: dashed ${grey['300']} 2px;
                      margin-left: 64px;
                    `}
                  />
                )}
                <Link
                  css={css`
                    display: flex;
                    padding: 16px 32px;
                    box-shadow: ${grey['200']} 0 0 8px 0;
                    color: ${grey['800']};
                    gap: 16px;
                    text-decoration: none;
                    transition: all 0.1s;

                    & > div {
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                    }

                    &:hover {
                      box-shadow: ${grey['300']} 0 0 12px 0;
                    }
                  `}
                  href={pagesPath.learning_path.courses
                    ._course_id(courseId)
                    .$url()}
                >
                  <Skeleton variant="rounded" width={64} height={64} />

                  <div>
                    <p>{course.title}</p>
                    <p>{course.description}</p>
                    <p>{course.steps.length}ステップ</p>
                  </div>
                </Link>
              </Fragment>
            );
          })}
        </div>
      </IndexLayout>
    </>
  );
};

export const LearningPath: FC<learningPathProps> = (props) => {
  return <PresentialLearningPath {...props} />;
};
