import { css } from '@emotion/react';
import { Skeleton } from '@mantine/core';
import type { FC } from 'react';

import { useColorMode } from '@/components/contexts/ColorModeContext';
import { useUserInfoContext } from '@/components/contexts/UserInfoContext';
import type { baseUserInfo } from '@/components/hooks/useUserInfo';
import { gray } from '@/styles/colors';

export type presentialUserNameProps = baseUserInfo;

export const PresentialUserName: FC<presentialUserNameProps> = ({
  userData,
}) => {
  const { themePattern } = useColorMode();
  const textColor = themePattern(gray[8], gray[3]);

  return (
    <>
      <div>
        {userData.data ? (
          <p
            css={css`
              color: ${textColor};
              font-size: 1.5rem;
              font-weight: bold;
            `}
          >
            {userData.data.name}
          </p>
        ) : (
          <>
            <Skeleton height={16} radius="xl" />
            <Skeleton height={16} mt={6} radius="xl" />
            <Skeleton height={16} mt={6} width="70%" radius="xl" />
          </>
        )}
      </div>
    </>
  );
};

export const UserName: FC = (props) => {
  const { user, userData } = useUserInfoContext();
  return <PresentialUserName user={user} userData={userData} {...props} />;
};
