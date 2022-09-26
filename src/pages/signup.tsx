import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Signup as SignupComponent } from '@/components/pages/Signup';

const Signup: NextPage = () => {
  return <SignupComponent />;
};

export default Signup;

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common', 'signup'])),
    },
  };
};
