import '@testing-library/jest-dom';

import { expect, it } from 'vitest';

import { mockEachRouter } from '/__mocks__/router';
import { render } from '@/lib/test/render';

import { Custom404 } from '.';

mockEachRouter();

it('should be rendered correctly', () => {
  const { container } = render(<Custom404 />);
  expect(container.firstChild).toMatchSnapshot();
});
