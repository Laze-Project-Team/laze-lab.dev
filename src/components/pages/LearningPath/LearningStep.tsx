import type { FC } from 'react';

import { IndexLayout } from '@/components/layouts/IndexLayout';
import type { learningStep } from '@/components/pages/LearningPath/learningPathType';

export type learningStepProps = {
  step: learningStep;
};

export const PresentialLearningStep: FC<learningStepProps> = ({ step }) => {
  return (
    <IndexLayout>
      <h1>{step.title}</h1>
      <p>{step.description}</p>
    </IndexLayout>
  );
};

export const LearningStep: FC<learningStepProps> = (props) => {
  return <PresentialLearningStep {...props} />;
};
