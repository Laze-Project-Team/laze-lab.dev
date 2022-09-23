import type { GetStaticProps } from 'next';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Home as HomeComponent } from '@/components/pages/Home';

const Home: NextPage = () => {
  return <HomeComponent />;
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'layout',
        'index',
      ])),
    },
  };
};
