import { css } from '@emotion/react';
import { grey } from '@mui/material/colors';
import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';

import { useColorMode } from '@/components/contexts/ColorModeContext';
import { useUserInfoContext } from '@/components/contexts/UserInfoContext';
import type { baseUserInfo } from '@/components/hooks/useUserInfo';

export type presentialUserNameProps = baseUserInfo;

export const PresentialUserName: FC<presentialUserNameProps> = ({
  userData,
}) => {
  const { themePattern } = useColorMode();
  const textColor = themePattern(grey['800'], grey['300']);

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
          <Skeleton
            variant="text"
            css={css`
              font-size: 1.5rem;
            `}
          />
        )}
      </div>
    </>
  );
};

export const UserName: FC = (props) => {
  const { user, userData } = useUserInfoContext();
  return <PresentialUserName user={user} userData={userData} {...props} />;
};
