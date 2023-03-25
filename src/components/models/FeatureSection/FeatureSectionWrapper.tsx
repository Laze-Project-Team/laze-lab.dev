import { Stack } from '@mantine/core';
import type { FC, ReactNode } from 'react';

export type featureSectionWrapperProps = {
  children: ReactNode;
};

export const FeatureSectionWrapper: FC<featureSectionWrapperProps> = ({
  children,
}) => {
  return (
    <Stack dir="column" spacing={32}>
      {children}
    </Stack>
  );
};
