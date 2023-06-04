import type { FC, ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

export const isDraggingBlockContext = createContext<boolean>(false);

export const useIsDraggingBlock = (): boolean => {
  const isDraggingBlock = useContext(isDraggingBlockContext);

  if (isDraggingBlock === null) {
    throw new Error('Please wrap component with IsDraggingBlockProvider');
  }

  return isDraggingBlock;
};

type draggingBlockProviderProps = {
  children: ReactNode;
};

export const IsDraggingBlockProvider: FC<draggingBlockProviderProps> = ({
  children,
}) => {
  const [isDraggingBlockState, setIsDraggingBlockState] = useState(false);
  useEffect(() => {
    window.addEventListener('dragover', () => {
      setIsDraggingBlockState(true);
    });
    window.addEventListener('dragend', () => {
      setIsDraggingBlockState(false);
    });
  }, []);

  return (
    <isDraggingBlockContext.Provider value={isDraggingBlockState}>
      {children}
    </isDraggingBlockContext.Provider>
  );
};
