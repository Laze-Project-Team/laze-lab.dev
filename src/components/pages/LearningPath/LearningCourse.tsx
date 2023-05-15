import { css } from '@emotion/react';
import { Text } from '@mantine/core';
import Link from 'next/link';
import type { FC } from 'react';

import { IndexLayout } from '@/components/layouts/IndexLayout';
import { pagesPath } from '@/lib/$path';
import { gray } from '@/styles/colors';

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
        <Text color="dimmed" mt={16}>
          {course.description}
        </Text>
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
                border: solid 1px ${gray[3]};

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
                      color: ${gray[8]};
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
