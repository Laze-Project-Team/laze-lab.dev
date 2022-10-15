import 'react-toastify/dist/ReactToastify.css';

import type { FC } from 'react';
import { ToastContainer as ToastifyToastContainer } from 'react-toastify';

import { useColorMode } from '@/components/contexts/ColorModeContext';

export const ToastContainer: FC = () => {
  const { colorMode } = useColorMode();
  return <ToastifyToastContainer theme={colorMode} />;
};
