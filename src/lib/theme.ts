import type { PaletteMode, Theme } from '@mui/material';
import { createTheme } from '@mui/material';

export const getTheme = (mode: PaletteMode): Theme =>
  createTheme({
    palette: {
      mode,
    },
  });
