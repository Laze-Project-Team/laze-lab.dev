import '@testing-library/jest-dom';

import { expect, it } from 'vitest';

import { userDataMock, userMock } from '/__mocks__/user';
import { render } from '@/lib/test/render';

import { UserAvatar } from '.';

it('should be rendered correctly', () => {
  const { container } = render(
    <UserAvatar user={userMock} userData={userDataMock} />,
  );
  expect(container.firstChild).toMatchSnapshot();
});
