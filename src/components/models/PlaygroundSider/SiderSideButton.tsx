import { css } from '@emotion/react';
import { UnstyledButton } from '@mantine/core';
import type { FC } from 'react';

import type { category } from '@/components/pages/Playground/editorLanguageType';
import { gray } from '@/styles/colors';

type presentialSiderSideButtonProps = {
  category: category;
  changeSidebarState: () => void;
};

export const PresentialSiderSideButton: FC<presentialSiderSideButtonProps> = ({
  category,
  changeSidebarState,
}) => {
  return (
    <UnstyledButton
      css={css`
        display: flex;
        width: 100%;
        height: 60px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: 0.1s;

        &:hover {
          background-color: ${gray[2]};
        }

        &:active {
          background-color: ${gray[3]};
        }
      `}
      onClick={changeSidebarState}
    >
      <div
        css={css`
          width: 35px;
          height: 30px;
          background-color: #999;
          mask: url('/icons/${category.icon}') no-repeat center;
        `}
      />
      <div
        css={css`
          color: #999;
          font-size: 0.8rem;
          font-weight: 500;
          line-height: 0.9rem;
          text-align: center;
        `}
      >
        {category.title}
      </div>
    </UnstyledButton>
  );
};

type selectedSiderSideButtonProps = {
  category: category;
};

export const PresentialSelectedSiderSideButton: FC<
  selectedSiderSideButtonProps
> = ({ category }) => {
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        height: 60px;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: ${gray[3]};
      `}
    >
      <div
        css={css`
          width: 35px;
          height: 30px;
          background-color: #666;
          mask: url('/icons/${category.icon}') no-repeat center;
        `}
      />
      <div
        css={css`
          color: #666;
          font-size: 0.8rem;
          font-weight: 500;
          line-height: 0.9rem;
          text-align: center;
        `}
      >
        {category.title}
      </div>
    </div>
  );
};

type siderSideButtonProps = {
  selected: boolean;
  category: category;
  changeSidebarState: () => void;
};

export const SiderSideButton: FC<siderSideButtonProps> = ({
  selected,
  category,
  changeSidebarState,
}) => {
  if (selected) {
    return <PresentialSelectedSiderSideButton category={category} />;
  }
  return (
    <PresentialSiderSideButton
      category={category}
      changeSidebarState={changeSidebarState}
    />
  );
};
