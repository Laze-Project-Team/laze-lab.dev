import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { FormDialogProvider } from '/__mocks__/FormDialogProvider';
import { render } from '@/lib/test/render';

import { FormDialogSelectItem } from '.';

it('should be rendered correctly', () => {
  const { container } = render(
    <FormDialogSelectItem
      label="this is label"
      name="unique-name"
      options={[]}
    />,
    { wrapper: FormDialogProvider },
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "button" role', () => {
  render(
    <FormDialogSelectItem
      label="this is label"
      name="unique-name"
      options={[]}
    />,
    {
      wrapper: FormDialogProvider,
    },
  );
  expect(screen.getByRole('button')).toBeInTheDocument();
});
