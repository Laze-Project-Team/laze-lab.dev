import type { ModalProps } from '@mantine/core';
import { Modal } from '@mantine/core';
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
} & ModalProps;

export type presentialFormDialogProps = {
  children: ReactNode;
} & ModalProps;

export const PresentialFormDialog: FC<presentialFormDialogProps> = ({
  children,
  ...props
}) => {
  const { onSubmit } = useFormDialogContext();
  return (
    <Modal {...props}>
      <form onSubmit={onSubmit}>{children}</form>
    </Modal>
  );
};

export const FormDialog = <T extends FieldValues>({
  id,
  defaultValues,
  children,
  opened,
  handleSubmit: handleSubmitCallback,
  ...props
}: formDialogProps<T>): ReactElement => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const onSubmit = handleSubmit(handleSubmitCallback);

  useEffect(() => {
    if (opened) {
      reset(defaultValues);
    }
  }, [defaultValues, opened, reset]);

  return (
    <FormDialogContextProvider
      value={{
        id,
        control: control as Control<FieldValues>,
        onSubmit,
      }}
    >
      <PresentialFormDialog opened={opened} {...props}>
        {children}
      </PresentialFormDialog>
    </FormDialogContextProvider>
  );
};
