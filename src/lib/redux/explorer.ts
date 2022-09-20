import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type {
  explorerCreateFilePayload,
  explorerDeleteDirentPayload,
  explorerMoveDirentPayload,
  explorerOpenFilePayload,
  explorerSaveFilePayload,
  explorerSetProjectPayload,
  explorerState,
} from '@/typings/redux';
import type { path } from '@/typings/redux';

const initialState: explorerState = {
  currentDirectory: {},
  currentFile: null,
  currentProject: null,
};

const isPath = (str: string): str is path => str.startsWith('/');

export const explorerSlice = createSlice({
  initialState,
  name: 'explorer',
  reducers: {
    createFile: (state, action: PayloadAction<explorerCreateFilePayload>) => {
      const path = action.payload.path;
      if (path in state.currentDirectory) {
        console.error(`[Redux] file "${path}" already exists`);
        return;
      }

      state.currentDirectory[path] = action.payload.file;

      // update folder children
      const folderPath = path.split('/').slice(0, -1).join('/');
      if (!isPath(folderPath)) return;

      if (!(folderPath in state.currentDirectory)) {
        console.error(`[Redux] folder "${folderPath}" does not exist`);
        return;
      }

      const folder = state.currentDirectory[folderPath];
      if (folder.type !== 'folder') {
        console.error(`[Redux] "${folderPath}" is not a folder`);
        return;
      }

      folder.children.push(path);
    },
    deleteDirent: (
      state,
      action: PayloadAction<explorerDeleteDirentPayload>,
    ) => {
      // delete file/folder recursively
      const deleteDirent = (path: path) => {
        if (!(path in state.currentDirectory)) {
          console.error(`[Redux] file/folder "${path}" does not exist`);
          return;
        }

        const dirent = state.currentDirectory[path];

        if (dirent.type === 'folder') {
          dirent.children.forEach((childrenPath) => {
            deleteDirent(childrenPath);
          });
        }

        delete state.currentDirectory[path];
      };

      deleteDirent(action.payload.path);
    },
    renameDirent: (state, action: PayloadAction<explorerMoveDirentPayload>) => {
      const { oldPath, newPath } = action.payload;
      if (oldPath === newPath) {
        console.error(`[Redux] oldPath and newPath is the same (${oldPath})`);
        return;
      }

      if (!(oldPath in state.currentDirectory)) {
        console.error(`[Redux] file/folder "${oldPath}" does not exist`);
        return;
      }

      if (newPath in state.currentDirectory) {
        console.error(`[Redux] file/folder "${newPath}" already exists`);
        return;
      }

      state.currentDirectory[newPath] = state.currentDirectory[oldPath];
      delete state.currentDirectory[oldPath];

      // update "children" property of folder

      const folderPath = oldPath.split('/').slice(0, -1).join('/');
      if (!isPath(folderPath)) return;

      if (!(folderPath in state.currentDirectory)) {
        console.error(`[Redux] folder "${folderPath}" does not exist`);
        return;
      }

      const folder = state.currentDirectory[folderPath];

      if (folder.type !== 'folder') {
        console.error(`[Redux] "${folderPath}" is not a folder`);
        return;
      }

      const childIndex = folder.children.findIndex((val) => val === oldPath);

      if (childIndex === -1) {
        console.error(
          `[Redux] "${folderPath}" does not have child "${oldPath}"`,
        );
        return;
      }

      folder.children[childIndex] = newPath;
    },
    openFile: (state, action: PayloadAction<explorerOpenFilePayload>) => {
      state.currentFile = action.payload.path;
    },
    closeFile: (state) => {
      state.currentFile = null;
    },
    saveFile: (state, action: PayloadAction<explorerSaveFilePayload>) => {
      const path = action.payload.path;

      if (!(path in state.currentDirectory)) {
        console.error(`[Redux] file ${path} does not exist`);
        return;
      }

      const dirent = state.currentDirectory[path];

      if (!('content' in dirent)) {
        console.error(`[Redux] file ${path} does not have property "content"`);
        return;
      }

      dirent.content = action.payload.content;
    },
    setProject: (state, action: PayloadAction<explorerSetProjectPayload>) => {
      state.currentProject = action.payload.project;
    },
  },
});
