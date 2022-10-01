import '@testing-library/jest-dom';

import { fireEvent, screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { mockEachRouter } from '/__mocks__/router';
import { localeList } from '@/const/locale';
import { render } from '@/lib/test/render';
import { locales } from '@/lib/utils/isLocale';

import { LocaleSelectButton } from '.';

const router = mockEachRouter();

it('should be rendered correctly', () => {
  const { container } = render(<LocaleSelectButton />);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "button" role', () => {
  render(<LocaleSelectButton />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

it('can change locale', async () => {
  render(<LocaleSelectButton />);
  const button = screen.getByRole('button');

  await Promise.all(
    locales.map(async (locale) => {
      fireEvent.mouseDown(button);
      const menuItem = await screen.findByRole('option', {
        name: localeList[locale],
      });

      fireEvent.click(menuItem);
      expect(button).toContainHTML(localeList[locale]);

      expect(router.push).toHaveBeenCalledWith(router.pathname, router.asPath, {
        locale,
      });
    }),
  );
});
