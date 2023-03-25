import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { Table } from './Table';

const component = (
  <Table>
    <thead>
      <tr>
        <th>data 1</th>
        <th>data 2</th>
        <th>data 3</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>2</td>
        <td>4</td>
        <td>6</td>
      </tr>
      <tr>
        <td>3</td>
        <td>6</td>
        <td>9</td>
      </tr>
      <tr>
        <td>4</td>
        <td>8</td>
        <td>12</td>
      </tr>
    </tbody>
  </Table>
);

it('should be rendered correctly', () => {
  const { container } = render(component);
  expect(container.firstChild).toMatchSnapshot();
});

it('should have "table" role', () => {
  render(component);
  expect(screen.getByRole('table')).toBeInTheDocument();
});
