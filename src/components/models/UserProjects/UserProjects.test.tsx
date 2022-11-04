import '@testing-library/jest-dom';

import { expect, it } from 'vitest';

import { mockEachRouter } from '/__mocks__/router';
import { render } from '@/lib/test/render';

import { UserProjects } from '.';

mockEachRouter();

it('should be rendered correctly', () => {
  const { container } = render(<UserProjects />);
  expect(container.firstChild).toMatchSnapshot();
});
