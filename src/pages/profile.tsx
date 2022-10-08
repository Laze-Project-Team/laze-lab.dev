import type { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Profile as ProfileComponent } from '@/components/pages/Profile';

const Profile: NextPage = () => {
  return <ProfileComponent />;
};

export default Profile;

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        'common',
        'layout',
        'profile',
      ])),
    },
  };
};
