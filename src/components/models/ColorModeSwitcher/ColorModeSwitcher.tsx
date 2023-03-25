import { ActionIcon, Tooltip } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
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
      <Tooltip label={t('switchColorMode')}>
        <ActionIcon onClick={handleClick} color="inherit" {...props}>
          {themePattern(<IconSun />, <IconMoon />)}
        </ActionIcon>
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
