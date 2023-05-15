import type { Meta, StoryFn } from '@storybook/react';
import type { FC, ReactNode } from 'react';

import { Table } from './Table';

export default {
  title: 'ui/MDXComponents/Table',
  component: Table,
} as Meta<typeof Table>;

const Template: StoryFn<FC<{ data: ReactNode[][] }>> = ({ data }) => (
  <Table>
    <thead>
      <tr>
        {data[0].map((val, i) => (
          <th key={`0-${i}`}>{val}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.slice(1).map((vals, i) => (
        <tr key={i}>
          {vals.map((val, j) => (
            <td key={`${i}-${j}`}>{val}</td>
          ))}
        </tr>
      ))}
    </tbody>
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
