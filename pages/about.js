import Head from 'next/head';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About</title>
      </Head>
      <h1 data-cy="about-page-content-h1">About page</h1>
      <p>This is the about page</p>
    </Layout>
  );
}
