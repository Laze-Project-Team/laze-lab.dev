import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { FormDialogProvider } from '/__mocks__/FormDialogProvider';
import { render } from '@/lib/test/render';

import { FormDialogTextItem } from '.';

it('should be rendered correctly', () => {
  const { container } = render(
    <FormDialogTextItem label="this is label" name="unique-name" />,
    {
      wrapper: FormDialogProvider,
    },
  );
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "textbox" role', () => {
  render(<FormDialogTextItem label="this is label" name="unique-name" />, {
    wrapper: FormDialogProvider,
  });
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});
