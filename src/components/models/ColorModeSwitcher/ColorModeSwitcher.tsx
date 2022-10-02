import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { useCallback } from 'react';

import { useColorMode } from '@/components/contexts/ColorModeContext';

export type presentialColorModeSwitcherProps = {
  handleClick: () => void;
};

export const PresentialColorModeSwitcher: FC<
  presentialColorModeSwitcherProps
> = ({ handleClick, ...props }) => {
  const [t] = useTranslation('layout');
  const { themePattern } = useColorMode();

  return (
    <>
      <Tooltip title={t('switchColorMode')}>
        <IconButton onClick={handleClick} color="inherit" {...props}>
          {themePattern(<LightModeIcon />, <DarkModeIcon />)}
        </IconButton>
      </Tooltip>
    </>
  );
};

export const ColorModeSwitcher: FC = (props) => {
  const { toggleColorMode } = useColorMode();

  const handleClick = useCallback(() => {
    toggleColorMode();
  }, [toggleColorMode]);

  return <PresentialColorModeSwitcher handleClick={handleClick} {...props} />;
};
