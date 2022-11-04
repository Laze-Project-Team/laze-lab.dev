import type { FC, ReactNode } from 'react';
import { createContext, useContext } from 'react';
import type {
  Control,
  FieldValues,
  UseFormHandleSubmit,
} from 'react-hook-form';

export type formDialogContextType<T extends FieldValues = FieldValues> = {
  id: string;
  control: Control<T>;
  onSubmit: ReturnType<UseFormHandleSubmit<T>>;
};

export const formDialogContext = createContext<formDialogContextType | null>(
  null,
);

export const useFormDialogContext = (): formDialogContextType => {
  const formDialogContextValue = useContext(formDialogContext);

  if (formDialogContextValue === null) {
    throw new Error('Please wrap component with FormDialogContextProvider');
  }

  return formDialogContextValue;
};

export const FormDialogContextProvider: FC<{
  value: formDialogContextType;
  children?: ReactNode;
}> = ({ value, children }) => {
  return (
    <formDialogContext.Provider value={value}>
      {children}
    </formDialogContext.Provider>
  );
};
