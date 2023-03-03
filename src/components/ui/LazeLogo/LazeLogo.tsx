import type { ImageProps, StaticImageData } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';

import logo from '/public/img/logo/logo.png';
import logoCaption from '/public/img/logo/logo_caption.png';
import logoCaptionGray from '/public/img/logo/logo_caption_gray.png';
import logoGray from '/public/img/logo/logo_gray.png';

const images: Record<lazeLogoOption, StaticImageData> = {
  logo,
  logo_caption: logoCaption,
  logo_gray: logoGray,
  logo_caption_gray: logoCaptionGray,
};

export type lazeLogoOption =
  | 'logo'
  | 'logo_gray'
  | 'logo_caption'
  | 'logo_caption_gray';

export type lazeLogoProps = {
  size: number;
  option: lazeLogoOption;
} & Omit<ImageProps, 'src'>;

export type presentialLazeLogoProps = lazeLogoProps;

export const PresentialLazeLogo: FC<presentialLazeLogoProps> = ({
  size,
  option,
  ...props
}) => {
  return (
    <Image
      src={images[option]}
      alt=""
      width={size}
      height={size}
      layout="fixed"
      role="presentation"
      {...props}
    />
  );
};

export const LazeLogo: FC<lazeLogoProps> = (props) => {
  return <PresentialLazeLogo {...props} />;
};
