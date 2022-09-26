import '@testing-library/jest-dom';

import { expect, it } from 'vitest';

import { mockEachRouter } from '/__mocks__/router';
import { ColorModeProvider } from '@/components/contexts/ColorModeContext';
import { render } from '@/lib/test/render';

import { Signup } from '.';

mockEachRouter();

it('should be rendered correctly', () => {
  const { container } = render(<Signup />, { wrapper: ColorModeProvider });
  expect(container.firstChild).toMatchSnapshot();
});
