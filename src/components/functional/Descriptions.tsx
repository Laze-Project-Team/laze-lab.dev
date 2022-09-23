import Head from 'next/head';
import { useRouter } from 'next/router';
import type { FC } from 'react';

export type descriptionProps = {
  title: string;
  description: string;
};

export const Descriptions: FC<descriptionProps> = ({
  title: titleContent,
  description,
}) => {
  const title = `${titleContent} | Laze`;
  const { locale, pathname } = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={description} name="description" />

        {/* OGP */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://laze.ddns.net${
            locale === 'en' ? '' : '/' + locale
          }${pathname}`}
        />
        <meta property="og:site_name" content={title} />
        <meta property="og:locale" content={locale ?? 'en'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@LazeProjectTeam" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content="https://laze.ddns.net/favicons/android-chrome-192x192.png"
        />
      </Head>
    </>
  );
};
