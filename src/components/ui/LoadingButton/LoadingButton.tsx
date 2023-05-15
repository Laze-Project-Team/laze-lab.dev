import type { ButtonProps, LoaderProps } from '@mantine/core';
import { Button, Loader } from '@mantine/core';
import type { ButtonHTMLAttributes, FC } from 'react';

export type loadingButtonProps = {
  loading?: boolean;
  loadingIconProps?: LoaderProps;
} & ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export type presentialLoadingButtonProps = loadingButtonProps;
export const PresentialLoadingButton: FC<presentialLoadingButtonProps> = ({
  loading,
  rightIcon,
  loadingIconProps,
  size,
  ...props
}) => {
  return (
    <>
      <Button
        {...props}
        rightIcon={
          loading ? (
            <Loader size="0.7em" color="inherit" {...loadingIconProps} />
          ) : (
            rightIcon
          )
        }
        size={size}
        {...(loading ? { disabled: true } : {})}
      />
    </>
  );
};

export const LoadingButton: FC<loadingButtonProps> = (props) => {
  return <PresentialLoadingButton {...props} />;
};
