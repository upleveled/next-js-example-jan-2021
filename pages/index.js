import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h1>Home page</h1>
      <p>This is the amazing home page</p>
      <Image
        src="/next-js.png"
        alt=""
        width="805"
        height="268"
        data-cy="home-page-content-image"
      />
    </>
  );
}
