import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import type { ButtonHTMLAttributes, FC } from 'react';
import { useState } from 'react';

import { AuthEditDialog } from './AuthEditDialog';

export type authEditDialogButtonProps = ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;
export type presentialAuthEditDialogButtonProps = {
  isDialogOpen: boolean;
  handleClick: () => void;
  handleClose: () => void;
} & authEditDialogButtonProps;

export const PresentialAuthEditDialogButton: FC<
  presentialAuthEditDialogButtonProps
> = ({ isDialogOpen, handleClick, handleClose, ...props }) => {
  const [t] = useTranslation('profile');

  return (
    <>
      <Button onClick={handleClick} {...props}>
        {t('auth.edit')}
      </Button>
      <AuthEditDialog opened={isDialogOpen} onClose={handleClose} />
    </>
  );
};
export const AuthEditDialogButton: FC<authEditDialogButtonProps> = ({
  ...props
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClick = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  return (
    <PresentialAuthEditDialogButton
      isDialogOpen={isDialogOpen}
      handleClick={handleClick}
      handleClose={handleClose}
      {...props}
    />
  );
};
