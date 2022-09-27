import '@testing-library/jest-dom';

import { expect, it } from 'vitest';

import { staticPath } from '@/lib/$path';
import { render } from '@/lib/test/render';

import { Image } from './Image';

it('should be rendered correctly', () => {
  const { container } = render(
    <Image src={staticPath.img.logo.logo_png} alt="logo" />,
  );
  expect(container.firstChild).toMatchSnapshot();
});
