import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Login as LoginComponent } from '@/components/pages/Login';

const Login: NextPage = () => {
  return <LoginComponent />;
};

export default Login;

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'login'])),
    },
  };
};
