import type { MDXComponents } from 'mdx/types';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { Descriptions } from '@/components/functional/Descriptions';
import { IndexLayout } from '@/components/layouts/IndexLayout/IndexLayout';
import {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Image,
  Li,
  Link,
  Ol,
  Paragraph,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Ul,
} from '@/components/ui/MDXComponents';
import { findMdx } from '@/lib/utils/findMdx';
import { getDocBySlug } from '@/lib/utils/getDocBySlug';
import { isLocale } from '@/lib/utils/isLocale';

type docsProps = {
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;

  meta: {
    title: string;
    description: string;
  };
};

const components: MDXComponents = {
  table: Table,
  tbody: Tbody,
  thead: Thead,
  tr: Tr,
  th: Th,
  td: Td,
  img: Image,
  ul: Ul,
  ol: Ol,
  li: Li,
  p: Paragraph,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: Link,
};

const MDXHome: NextPage<docsProps> = ({ content, meta }) => {
  return (
    <>
      <Descriptions title={meta.title} description={meta.description} />

      <IndexLayout>
        <MDXRemote components={components} {...content} />
      </IndexLayout>
    </>
  );
};

export default MDXHome;

export const getStaticProps: GetStaticProps = async (context) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }

  if (!isLocale(context.locale)) {
    throw new Error(`locale "${context.locale}" is not supported`);
  }

  if (typeof context.params === 'undefined') {
    throw new Error('parameters is not defined');
  }

  const { content, meta } = getDocBySlug(
    `${context.params.path}.${context.locale}.mdx`,
  );
  const mdxSource = await serialize(content);

  return {
    props: {
      content: mdxSource,
      meta,
      ...(await serverSideTranslations(context.locale, ['common', 'layout'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = findMdx('/');

  return {
    paths,
    fallback: false,
  };
};
