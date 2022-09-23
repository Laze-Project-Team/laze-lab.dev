import { createTheme } from '@material-ui/core';

export const theme = createTheme({
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: 'var(--color-darkgray)',
      },
    },
  },
});
