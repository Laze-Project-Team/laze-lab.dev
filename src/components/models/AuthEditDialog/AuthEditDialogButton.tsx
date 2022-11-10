import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useState } from 'react';

import { AuthEditDialog } from './AuthEditDialog';

export type authEditDialogButtonProps = ButtonProps;
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
      <AuthEditDialog open={isDialogOpen} onClose={handleClose} />
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
