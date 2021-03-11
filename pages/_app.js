import { css, Global } from '@emotion/react';
import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function App({ Component, pageProps }) {
  const [isSessionStateStale, setIsSessionStateStale] = useState(true);
  const [isSessionValid, setIsSessionValid] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/is-session-valid');
      const newValue = (await response.json()).isSessionValid;
      setIsSessionValid(newValue);
      setIsSessionStateStale(false);
    }

    if (isSessionStateStale) fetchData();
  }, [isSessionStateStale]);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            min-height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen;
            /* background: papayawhip; */
            /* font-family: Helvetica, Arial, sans-serif; */
          }
        `}
      />
      <Layout isSessionValid={isSessionValid}>
        <Component
          {...pageProps}
          setIsSessionStateStale={setIsSessionStateStale}
        />
      </Layout>
    </>
  );
}
