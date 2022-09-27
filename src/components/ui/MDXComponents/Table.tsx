import Paper from '@mui/material/Paper';
import MUITable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';

export const Table: FC<JSX.IntrinsicElements['table']> = ({ children }) => (
  <TableContainer component={Paper}>
    <MUITable>{children}</MUITable>
  </TableContainer>
);

export const Thead: FC<JSX.IntrinsicElements['thead']> = ({ children }) => (
  <TableHead>{children}</TableHead>
);

export const Tbody: FC<JSX.IntrinsicElements['tbody']> = ({ children }) => (
  <TableBody>{children}</TableBody>
);

export const Tr: FC<JSX.IntrinsicElements['tr']> = ({ children }) => (
  <TableRow>{children}</TableRow>
);

export const Th: FC<JSX.IntrinsicElements['th']> = ({ children }) => (
  <TableCell>{children}</TableCell>
);

export const Td: FC<JSX.IntrinsicElements['td']> = ({ children }) => (
  <TableCell>{children}</TableCell>
);
