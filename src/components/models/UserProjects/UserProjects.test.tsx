import '@testing-library/jest-dom';

import { expect, it } from 'vitest';

import { mockEachRouter } from '/__mocks__/router';
import { userDataMock, userMock } from '/__mocks__/user';
import { render } from '@/lib/test/render';

import { UserProjects } from '.';

mockEachRouter();

it('should be rendered correctly', () => {
  const { container } = render(
    <UserProjects user={userMock} userData={userDataMock} />,
  );
  expect(container.firstChild).toMatchSnapshot();
});
