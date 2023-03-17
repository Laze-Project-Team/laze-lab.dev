import { css } from '@emotion/react';
import { Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { IndexLayout } from '@/components/layouts/IndexLayout';
import type {
  learningContents,
  learningPath,
} from '@/components/pages/LearningPath/learningPathType';
import { pagesPath } from '@/lib/$path';
import { pc } from '@/styles/media-query';

type learningPathPanelProps = {
  path: learningPath;
};

const LearningPathPanel: FC<learningPathPanelProps> = ({ path }) => (
  <Link
    href={pagesPath.learning_path.paths._path_id(path.id).$url()}
    css={css`
      text-decoration: none;
    `}
  >
    <div
      css={css`
        display: flex;
        flex-direction: column;
        padding: 16px;
        background-color: white;
        border-radius: 4px;
        box-shadow: ${grey['200']} 0 0 4px 0;
        gap: 4px;

        & > p {
          color: ${grey['800']};
          text-align: center;
          text-decoration: none;
        }
      `}
    >
      <p>{path.title}</p>
      <Skeleton variant="rounded" width="100%" height={100} />
      <p>{path.description}</p>
    </div>
  </Link>
);

export type learningPathListProps = {
  paths: learningContents['paths'];
};

export const LearningPathList: FC<learningPathListProps> = ({ paths }) => {
  const [t] = useTranslation('list');
  return (
    <IndexLayout>
      <h1
        css={css`
          margin-bottom: 32px;
        `}
      >
        {t('list')}
      </h1>
      <div
        css={css`
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(3, 1fr);
          ${pc} {
            grid-template-columns: repeat(4, 1fr);
          }
        `}
      >
        {Object.values(paths).map((path) => (
          <LearningPathPanel key={path.id} path={path} />
        ))}
      </div>
    </IndexLayout>
  );
};
