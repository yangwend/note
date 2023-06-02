import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>你好，我是一个前端开发工程师鞍山市所所所所所所所所所所所所所所所所所所所</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://www.nextjs.cn/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
}
