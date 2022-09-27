import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { FC, ReactNode } from 'react';

import { Table, Tbody, Td, Th, Thead, Tr } from './Table';

export default {
  title: 'ui/MDXComponents/Table',
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<FC<{ data: ReactNode[][] }>> = ({ data }) => (
  <Table>
    <Thead>
      <Tr>
        {data[0].map((val, i) => (
          <Th key={`0-${i}`}>{val}</Th>
        ))}
      </Tr>
    </Thead>
    <Tbody>
      {data.slice(1).map((vals, i) => (
        <Tr key={i}>
          {vals.map((val, j) => (
            <Td key={`${i}-${j}`}>{val}</Td>
          ))}
        </Tr>
      ))}
    </Tbody>
  </Table>
);

export const Primary = Template.bind({});
Primary.args = {
  data: [
    ['data 1', 'data 2', 'data 3'],
    [300, 200, 100],
    [300, 200, 100],
    [300, 200, 100],
    [300, 200, 100],
    [300, 200, 100],
    [300, 200, 100],
    [300, 200, 100],
    [300, 200, 100],
    [300, 200, 100],
    [300, 200, 100],
  ],
};
