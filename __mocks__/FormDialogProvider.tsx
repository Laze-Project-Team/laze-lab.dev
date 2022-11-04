import type { FC, ReactNode } from 'react';
import { useForm } from 'react-hook-form';

import { FormDialogContextProvider } from '@/components/ui/FormDialog/FormDialogContext';

export const FormDialogProvider: FC<{ children?: ReactNode }> = ({
  children,
}) => {
  const { control } = useForm();
  return (
    <FormDialogContextProvider
      value={{
        id: 'mock-form-dialog',
        control,
        onSubmit: async (data) => console.log(data),
      }}
    >
      {children}
    </FormDialogContextProvider>
  );
};
