import Stack from '@mui/material/Stack';
import type { FC, ReactNode } from 'react';

export type featureSectionWrapperProps = {
  children: ReactNode;
};

export const FeatureSectionWrapper: FC<featureSectionWrapperProps> = ({
  children,
}) => {
  return (
    <Stack direction="column" gap={32}>
      {children}
    </Stack>
  );
};
