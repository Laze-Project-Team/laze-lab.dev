import '@testing-library/jest-dom';

import { expect, it } from 'vitest';

import { mockEachRouter } from '/__mocks__/router';
import { render } from '@/lib/test/render';

import { Home } from '.';

mockEachRouter();

it('should be rendered correctly', () => {
  const { container } = render(<Home />);
  expect(container.firstChild).toMatchSnapshot();
});
