import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Date from '../components/date';
import { getSortedPostsData } from '../lib/posts';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';

const Home = ({ allPostsData, name }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>你好，我是一个前端开发工程师：{name}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://www.nextjs.cn/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              <Link href={`/posts/${id}`}>{id}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Home;

// pre-render，只请求一次
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
      name: 'yw',
    },
  };
};

// Server-side Rendering，每次都要请求
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       // props for your component
//     },
//   };
// }
