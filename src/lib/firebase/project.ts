import {
  addDoc,
  arrayRemove,
  collection,
  doc,
  getDoc,
  runTransaction,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';

import { timestampToDate } from '@/lib/firebase/TimestampToDate';
import type {
  baseProjectMeta,
  projectContent,
  projectMeta,
} from '@/typings/database';

import { useFirebase } from '.';

export type projectManager = {
  createProject: (config: baseProjectMeta) => Promise<string>;
  fetchProjectMeta: (id: string) => Promise<projectMeta>;
  fetchProjectContent: (id: string) => Promise<projectContent>;
  updateProjectMeta: (
    id: string,
    meta: Partial<baseProjectMeta>,
  ) => Promise<void>;
  updateProjectContent: (id: string, content: projectContent) => Promise<void>;
  deleteProject: (projectId: string, userId?: string) => Promise<void>;
};

export const useProjectManager = (): projectManager => {
  const { db } = useFirebase();

  const createProject: projectManager['createProject'] = async (meta) => {
    const projectMeta: projectMeta = {
      ...meta,
      createdAt: new Date(),
      lastEdittedAt: new Date(),
    };

    const docRef = await addDoc(collection(db, 'projectMetas'), projectMeta);

    const projectContent: projectContent = {
      directory: {},
    };

    await setDoc(doc(db, 'projectContents', docRef.id), projectContent);

    return docRef.id;
  };

  const fetchProjectMeta: projectManager['fetchProjectMeta'] = async (id) => {
    const snapshot = await getDoc(doc(db, 'projectMetas', id));

    if (!snapshot.exists()) {
      throw new Error('project is not found');
    }

    const projectMeta = timestampToDate(snapshot.data()) as projectMeta;

    return projectMeta;
  };

  const fetchProjectContent: projectManager['fetchProjectContent'] = async (
    id,
  ) => {
    const snapshot = await getDoc(doc(db, 'projectContents', id));

    if (!snapshot.exists()) {
      throw new Error('project is not found');
    }

    const projectContent = timestampToDate(snapshot.data()) as projectContent;

    return projectContent;
  };

  const updateProjectMeta: projectManager['updateProjectMeta'] = async (
    id,
    meta,
  ) => {
    const newData: Partial<projectMeta> = {
      ...meta,
      lastEdittedAt: new Date(),
    };
    await updateDoc(doc(db, 'projectMetas', id), newData);
  };

  const updateProjectContent: projectManager['updateProjectContent'] = async (
    id,
    content,
  ): Promise<void> => {
    const batch = writeBatch(db);
    batch.update(doc(db, 'projectContents', id), content);
    batch.update(doc(db, 'projectMetas', id), { lastEdittedAt: new Date() });
    await batch.commit();
  };

  const deleteProject: projectManager['deleteProject'] = async (
    projectId,
    userId,
  ) => {
    if (userId === undefined) {
      await runTransaction(db, async (transaction) => {
        const meta = await transaction.get(doc(db, 'projectMetas', projectId));
        if (!meta.exists()) {
          throw new Error('Document does not exist!');
        }

        const projectMeta = meta.data() as projectMeta;

        transaction.update(doc(db, 'users', projectMeta.owner), {
          projects: arrayRemove(projectId),
        });

        transaction.delete(doc(db, 'projectMetas', projectId));
        transaction.delete(doc(db, 'projectContents', projectId));
      });
    }
  };

  return {
    createProject,
    fetchProjectMeta,
    fetchProjectContent,
    updateProjectMeta,
    updateProjectContent,
    deleteProject,
  };
};
