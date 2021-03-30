import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';

type Props = {
  refreshIsSessionValid: () => Promise<void>;
};
export default function Logout(props: Props) {
  useEffect(() => {
    props.refreshIsSessionValid();
  }, [props]);
  return (
    <>
      <Head>
        <title>Logged out successfully</title>
      </Head>

      <h1>Logged out successfully</h1>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { deleteSessionByToken } = await import('../util/database');
  const { serializeEmptyCookieServerSide } = await import('../util/cookies');

  await deleteSessionByToken(context.req.cookies.session);
  const emptyCookie = serializeEmptyCookieServerSide('session');
  context.res.setHeader('Set-Cookie', emptyCookie);
  return { props: {} };
}
