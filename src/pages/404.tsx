import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Custom404 as Custom404Component } from '@/components/pages/Custom404';

const Custom404: NextPage = () => {
  return <Custom404Component />;
};

export default Custom404;

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'layout',
        '404',
      ])),
    },
  };
};
