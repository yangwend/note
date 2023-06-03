// Pages that begin with [ and end with ] are dynamic routes in Next.js.
import Layout from '../../components/layout';
import Date from '../../components/date';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticPaths, GetStaticProps } from 'next';

const Post = ({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    id: string;
    contentHtml: string;
  };
}) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      </article>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      {postData.id}
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
    </Layout>
  );
};

export default Post;

// 动态路由，使用 getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible value for id
  const paths = getAllPostIds();
  return {
    paths, // 通过 path 暴露
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the blog post using params.id
  // /posts/a/b/c：id 为 ['a', 'b', 'c']
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};
