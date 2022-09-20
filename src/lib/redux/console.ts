import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { getHash } from '@/lib/utils/getHash';
import type { consoleAddLogPayload, consoleState } from '@/typings/redux';

const initialState: consoleState = {
  console: [],
};

export const consoleSlice = createSlice({
  initialState,
  name: 'console',
  reducers: {
    addLog: (state, action: PayloadAction<consoleAddLogPayload>) => {
      state.console.push({
        type: 'log',
        id: getHash(),
        content: action.payload.content,
        timestamp: Date.now(),
        level: action.payload.level,
      });
    },
    addSeparator: (state) => {
      state.console.push({
        type: 'separater',
        id: getHash(),
      });
    },
    clearLog: (state) => {
      state.console = [];
    },
  },
});
