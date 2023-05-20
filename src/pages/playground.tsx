import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Playground as PlaygroundComponent } from '../components/pages/Playground';

const Playground: NextPage = () => {
  return <PlaygroundComponent />;
};

export default Playground;

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'playground',
      ])),
    },
  };
};
