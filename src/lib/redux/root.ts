import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { consoleSlice } from './console';
import { explorerSlice } from './explorer';

const rootReducer = combineReducers({
  explorer: explorerSlice.reducer,
  console: consoleSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools:
    typeof window !== 'undefined' && process.env.NODE_ENV === 'development'
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
      : undefined,
});
