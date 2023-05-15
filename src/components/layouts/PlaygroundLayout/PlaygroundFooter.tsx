import { css } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { gray } from '@/styles/colors';

export const PresentialPlaygroundFooter: FC = () => {
  const [t] = useTranslation(['layout', 'common']);

  return (
    <>
      <footer
        css={css`
          height: 24px;
          border-top: 1px solid ${gray[2]};
          background-color: ${gray[1]};
        `}
      >
        <div
          css={css`
            max-width: 1200px;
          `}
        >
          <p
            css={css`
              color: ${gray[7]};
              text-align: center;
            `}
          >
            {t('common:copyright')}
          </p>
        </div>
      </footer>
    </>
  );
};

export const PlaygroundFooter: FC = () => {
  return <PresentialPlaygroundFooter />;
};
