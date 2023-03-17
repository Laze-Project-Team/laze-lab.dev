import { css } from '@emotion/react';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import type { FC } from 'react';

import { IndexLayout } from '@/components/layouts/IndexLayout';
import { pagesPath } from '@/lib/$path';

import type { learningContents, learningCourse } from './learningPathType';

export type learningCourseProps = {
  course: learningCourse;
  steps: learningContents['steps'];
};

export const PresentialLearningCourse: FC<learningCourseProps> = ({
  course,
  steps,
}) => {
  return (
    <>
      <IndexLayout>
        <h1>{course.title}</h1>
        <Typography color="text.secondary" mt={2}>
          {course.description}
        </Typography>
        <div
          css={css`
            display: flex;
            margin-top: 32px;
          `}
        >
          <ul
            css={css`
              width: 100%;
              list-style: none;

              & > li {
                padding: 8px 32px;
                border: solid 1px ${grey['300']};

                &:not(:last-of-type) {
                  border-bottom: none;
                }
              }
            `}
          >
            {course.steps.map((stepId) => {
              const step = steps[stepId];
              return (
                <li key={step.id}>
                  <Link
                    href={pagesPath.learning_path.steps._step_id(stepId).$url()}
                    css={css`
                      color: ${grey['800']};
                      text-decoration: none;
                    `}
                  >
                    <p>{step.title}</p>
                    <p>{step.description}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </IndexLayout>
    </>
  );
};

export const LearningCourse: FC<learningCourseProps> = (props) => {
  return <PresentialLearningCourse {...props} />;
};
