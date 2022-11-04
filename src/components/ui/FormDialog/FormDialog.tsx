import type { DialogProps } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import type { FC, ReactElement, ReactNode } from 'react';
import { useEffect } from 'react';
import type { Control, DefaultValues, FieldValues } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import {
  FormDialogContextProvider,
  useFormDialogContext,
} from '@/components/ui/FormDialog/FormDialogContext';

export type formDialogProps<T extends FieldValues> = {
  id: string;
  defaultValues: DefaultValues<T>;
  handleSubmit: (data: T) => void;
  children?: ReactNode;
} & DialogProps;

export type presentialFormDialogProps = {
  children: ReactNode;
} & DialogProps;

export const PresentialFormDialog: FC<presentialFormDialogProps> = ({
  children,
  ...props
}) => {
  const { onSubmit } = useFormDialogContext();
  return (
    <Dialog {...props}>
      <form onSubmit={onSubmit}>{children}</form>
    </Dialog>
  );
};

export const FormDialog = <T extends FieldValues>({
  id,
  defaultValues,
  children,
  open,
  handleSubmit: handleSubmitCallback,
  ...props
}: formDialogProps<T>): ReactElement => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const onSubmit = handleSubmit(handleSubmitCallback);

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [defaultValues, open, reset]);

  return (
    <FormDialogContextProvider
      value={{
        id,
        control: control as Control<FieldValues>,
        onSubmit,
      }}
    >
      <PresentialFormDialog open={open} {...props}>
        {children}
      </PresentialFormDialog>
    </FormDialogContextProvider>
  );
};
