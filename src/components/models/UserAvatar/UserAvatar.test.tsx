import '@testing-library/jest-dom';

import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { UserAvatar } from '.';

it('should be rendered correctly', () => {
  const { container } = render(<UserAvatar />);
  expect(container.firstChild).toMatchSnapshot();
});
