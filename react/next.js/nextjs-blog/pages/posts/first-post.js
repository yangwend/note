import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';

export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h1>hello first post</h1>
      <h2>
        now go to <Link href='/'>home</Link> page
      </h2>
    </Layout>
  );
}
