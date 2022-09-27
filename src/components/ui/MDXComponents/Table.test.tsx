import '@testing-library/jest-dom';

import { screen } from '@testing-library/react';
import { expect, it } from 'vitest';

import { render } from '@/lib/test/render';

import { Table, Tbody, Td, Th, Thead, Tr } from './Table';

const component = (
  <Table>
    <Thead>
      <Tr>
        <Th>data 1</Th>
        <Th>data 2</Th>
        <Th>data 3</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>1</Td>
        <Td>2</Td>
        <Td>3</Td>
      </Tr>
      <Tr>
        <Td>2</Td>
        <Td>4</Td>
        <Td>6</Td>
      </Tr>
      <Tr>
        <Td>3</Td>
        <Td>6</Td>
        <Td>9</Td>
      </Tr>
      <Tr>
        <Td>4</Td>
        <Td>8</Td>
        <Td>12</Td>
      </Tr>
    </Tbody>
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
