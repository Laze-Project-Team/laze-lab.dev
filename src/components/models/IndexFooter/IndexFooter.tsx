import { css } from '@emotion/react';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';

import { gray } from '@/styles/colors';

export const PresentialIndexFooter: FC = () => {
  const [t] = useTranslation(['layout', 'common']);

  return (
    <>
      <footer
        css={css`
          padding: 16px;
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

export const IndexFooter: FC = () => {
  return <PresentialIndexFooter />;
};
