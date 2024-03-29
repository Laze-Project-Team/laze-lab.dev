import { css } from '@emotion/react';
import { Flex, Stack, useMantineTheme } from '@mantine/core';
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
}) => {
  const { colors } = useMantineTheme();
  return (
    <Flex
      direction={imagePosition === 'right' ? 'row' : 'row-reverse'}
      gap={32}
      justify="space-between"
      css={css`
        ${sp} {
          flex-direction: column;
        }
      `}
    >
      <Stack
        justify="center"
        spacing={16}
        css={css`
          flex: 1;
        `}
      >
        <p
          css={css`
            color: ${colors.gray[8]};
            font-size: 2rem;
            font-weight: 700;
          `}
        >
          {title}
        </p>
        <p
          css={css`
            color: ${colors.gray[6]};
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
    </Flex>
  );
};

export const FeatureSection: FC<featureSectionProps> = (props) => {
  return <PresentialFeatureSection {...props} />;
};
