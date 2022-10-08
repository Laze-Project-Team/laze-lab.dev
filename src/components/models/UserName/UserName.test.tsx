import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { userDataMock, userMock } from '/__mocks__/user';
import { render } from '@/lib/test/render';

import type { userNameProps } from '.';
import { UserName } from '.';

it('should be rendered correctly', () => {
  const { container } = render(
    <UserName user={userMock} userData={userDataMock} />,
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('should render username', () => {
  const username = "I'm a user";
  render(
    <UserName
      user={userMock}
      userData={
        {
          ...userDataMock,
          data: { ...userDataMock.data, name: username },
        } as userNameProps['userData']
      }
    />,
  );

  expect(screen.getByText(username)).toBeInTheDocument();
});
