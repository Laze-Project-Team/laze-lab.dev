// ----- state -----

export type rootState = {
  explorer: explorerState;
  console: consoleState;
};

export type explorerState = {
  currentFile: string | null;
  currentProject: projectConfig | null;
  currentDirectory: explorerDirectory;
};

export type projectConfig = {
  id: string;
  lang: LangId;
  name: projectName;
  private: boolean;
};

export type projectName = Record<langId, string>;

export type explorerDirectory = Record<path, explorerDirent>;

export type path = `/${string}`;

export type explorerDirent = explorerFile | explorerFolder;

export type explorerFile =
  | explorerLazeFile
  | explorerTextFile
  | explorerImageFile;

export type explorerFolder = {
  type: 'folder';
  // 子要素のパス一覧
  children: path[];
};

// TODO: 未確定
export type explorerLazeFile = {
  type: 'laze';
  // Lazeの言語
  lang: LangId;
  content: string;
};

export type explorerTextFile = {
  type: 'text';
  content: string;
};

export type explorerImageFile = {
  type: 'image';
  url: string;
};

export type consoleState = {
  console: consoleOutput[];
};

export type consoleOutput = consoleLog | consoleSeparater;

export type consoleLog = {
  type: 'log';
  id: string;
  content: string;
  timestamp: number;
  level: logLevel;
};

export type logLevel = 'log' | 'error' | 'warn' | 'info';

export type consoleSeparater = {
  type: 'separater';
  id: string;
};

// ----- payload -----

export type explorerCreateFilePayload = {
  path: path;
  file: explorerFile;
};

export type explorerDeleteDirentPayload = {
  path: path;
};

export type explorerMoveDirentPayload = {
  oldPath: path;
  newPath: path;
};

export type explorerOpenFilePayload = {
  path: path;
};

export type explorerSaveFilePayload = {
  path: path;
  content: string;
};

export type explorerSetProjectPayload = {
  project: projectConfig;
};

export type consoleAddLogPayload = {
  content: string;
  level: logLevel;
};
