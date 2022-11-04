import type { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
import type { CircularProgressProps } from '@mui/material/CircularProgress';
import CircularProgress from '@mui/material/CircularProgress';
import type { FC } from 'react';

export type loadingButtonProps = {
  loading?: boolean;
  loadingIconProps?: CircularProgressProps;
} & ButtonProps;

export type presentialLoadingButtonProps = loadingButtonProps;
export const PresentialLoadingButton: FC<presentialLoadingButtonProps> = ({
  loading,
  endIcon,
  loadingIconProps,
  size,
  ...props
}) => {
  return (
    <>
      <Button
        {...props}
        endIcon={
          loading ? (
            <CircularProgress
              size="0.7em"
              color="inherit"
              {...loadingIconProps}
            />
          ) : (
            endIcon
          )
        }
        size={size}
        disabled={loading}
      />
    </>
  );
};

export const LoadingButton: FC<loadingButtonProps> = (props) => {
  return <PresentialLoadingButton {...props} />;
};
