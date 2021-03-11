import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <h1 data-cy="about-page-content-h1">About page</h1>
      <p>This is the about page</p>
    </>
  );
}
