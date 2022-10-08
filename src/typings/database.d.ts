export type Collections = {
  users: Record<string, userData>;
  projectMetas: Record<string, projectMeta>;
  projectContents: Record<string, projectContent>;
};

export type baseUserData = {
  // nickname
  name: string;
  locale: import('@/lib/utils/isLocale').localeId;
  // url of avatar icon
  avatarURL: string | null;
  // Array of project id
  projects: string[];
};

export type userData = baseUserData & {
  createdAt: Date;
};

export type baseProjectMeta = {
  owner: string;
  // reduxのところを参照
  config: Omit<import('@/typings/redux').projectConfig, 'id'>;
};

export type projectMeta = baseProjectMeta & {
  createdAt: Date;
  lastEdittedAt: Date;
};

export type projectContent = {
  directory: import('@/typings/redux').explorerDirectory;
};
