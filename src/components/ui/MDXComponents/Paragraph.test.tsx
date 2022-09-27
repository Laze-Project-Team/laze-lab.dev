import '@testing-library/jest-dom';

import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { Paragraph } from './Paragraph';

it('should be rendered correctly', () => {
  const { container } = render(<Paragraph />);
  expect(container.firstChild).toMatchSnapshot();
});
