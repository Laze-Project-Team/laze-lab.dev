import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { userDataMock, userMock } from '/__mocks__/user';
import { userInfoContext } from '@/components/contexts/UserInfoContext';
import { render } from '@/lib/test/render';

import type { userNameProps } from '.';
import { UserName } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<UserName />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should render username', () => {
  const username = "I'm a user";
  render(
    <userInfoContext.Provider
      value={{
        user: userMock,
        userData: {
          ...userDataMock,
          data: { ...userDataMock.data, name: username },
        } as userNameProps['userData'],
        syncUserData: () => void 0,
      }}
    >
      <UserName />
    </userInfoContext.Provider>,
  );

  expect(screen.getByText(username)).toBeInTheDocument();
});
