import type { MDXComponents } from 'mdx/types';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { Descriptions } from '@/components/functional/Descriptions';
import { IndexLayout } from '@/components/layouts/IndexLayout/IndexLayout';
import { Table } from '@/components/ui/MDXComponents/Table';
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

type paramType = { path: string };

export const getStaticProps: GetStaticProps<docsProps, paramType> = async (
  context,
) => {
  if (context.locale === undefined) {
    throw new Error('context.locale is not defined');
  }

  if (!isLocale(context.locale)) {
    throw new Error(`locale "${context.locale}" is not supported`);
  }

  if (typeof context.params === 'undefined') {
    throw new Error('parameters is not defined');
  }

  const { content, meta } = getDocBySlug(context.params.path);
  const mdxSource = await serialize(content);

  return {
    props: {
      content: mdxSource,
      meta,
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
