import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { Error } from '../util/types';

type Props = {
  csrfToken: string;
  setIsSessionStateStale: Dispatch<SetStateAction<boolean>>;
};

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Error[]>([]);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
              csrfToken: props.csrfToken,
            }),
          });

          const { user, errors: returnedErrors } = await response.json();

          if (returnedErrors) {
            setErrors(returnedErrors);
            return;
          }

          const returnTo = Array.isArray(router.query.returnTo)
            ? router.query.returnTo[0]
            : router.query.returnTo;

          router.push(returnTo || `/profile/${user.id}`);
          props.setIsSessionStateStale(true);
        }}
      >
        <label>
          username:
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button type="submit">login</button>
      </form>

      {errors.map((error) => (
        <div style={{ color: 'red' }} key={`error-message-${error.message}`}>
          {error.message}
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Redirect from HTTP to HTTPS on Heroku
  if (
    context.req.headers.host &&
    context.req.headers['x-forwarded-proto'] &&
    context.req.headers['x-forwarded-proto'] !== 'https'
  ) {
    return {
      redirect: {
        destination: `https://${context.req.headers.host}/login`,
        permanent: true,
      },
    };
  }

  const { createCsrfToken } = await import('../util/auth');
  const { getSessionByToken, deleteAllExpiredSessions } = await import(
    '../util/database'
  );
  const { createSessionWithCookie } = await import('../util/sessions');

  let session = await getSessionByToken(context.req.cookies.session);

  // If the user already has a valid session cookie,
  // don't allow visiting the login page
  if (session?.userId) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  await deleteAllExpiredSessions();

  if (!session) {
    const result = await createSessionWithCookie();
    session = result.session;
    context.res.setHeader('Set-Cookie', result.sessionCookie);
  }

  // At this point, we have either used the existing
  // valid session token, or we have created a new one.
  //
  // We can use this to generate a CSRF token
  // to mitigate CSRF attacks
  const csrfToken = createCsrfToken(session.token);

  return { props: { csrfToken: csrfToken } };
}
