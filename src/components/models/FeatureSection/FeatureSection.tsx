import { css } from '@emotion/react';
import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import type { FC, ReactNode } from 'react';

import { sp } from '@/styles/media-query';

export type featureSectionProps = {
  imagePosition: 'right' | 'left';
  title: ReactNode;
  description: ReactNode;
  image: ReactNode;
};

export type presentialFeatureSectionProps = featureSectionProps;

export const PresentialFeatureSection: FC<presentialFeatureSectionProps> = ({
  imagePosition,
  title,
  description,
  image,
}) => (
  <Stack
    direction={imagePosition === 'right' ? 'row' : 'row-reverse'}
    gap={4}
    justifyContent="space-between"
    css={css`
      ${sp} {
        flex-direction: column;
      }
    `}
  >
    <Stack
      direction="column"
      justifyContent="center"
      gap={2}
      css={css`
        flex: 1;
      `}
    >
      <p
        css={css`
          color: ${grey['800']};
          font-size: 2rem;
          font-weight: 700;
        `}
      >
        {title}
      </p>
      <p
        css={css`
          color: ${grey['600']};
        `}
      >
        {description}
      </p>
    </Stack>
    <div
      css={css`
        width: 45%;
        height: 500px;
      `}
    >
      {image}
    </div>
  </Stack>
);

export const FeatureSection: FC<featureSectionProps> = (props) => {
  return <PresentialFeatureSection {...props} />;
};
