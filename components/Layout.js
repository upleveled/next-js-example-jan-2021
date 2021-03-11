import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';

const headerStyles = css`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 8px;

  a + a {
    margin-left: 15px;
  }

  nav {
    display: flex;
  }

  div {
    margin-left: auto;
  }
`;

export default function Layout(props) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header css={headerStyles}>
        <nav>
          {/*
            💥 Normal link: this will be slow:
            <a href="/about">About</a>
          */}
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/about">
            <a data-cy="header-about">About</a>
          </Link>
          <Link href="/team">
            <a data-cy="header-team">Team</a>
          </Link>
          <div>
            {!props.isSessionValid ? (
              <>
                <Link href="/register">
                  <a data-cy="header-register">Register</a>
                </Link>
                <Link href="/login">
                  <a data-cy="header-login">Login</a>
                </Link>
              </>
            ) : (
              <Link href="/logout">
                <a data-cy="header-logout">Logout</a>
              </Link>
            )}
          </div>
        </nav>
      </header>

      {
        // This is all of the content in between
        // the opening <Layout> tag and the closing
        // </Layout> tag
        props.children
      }

      <footer style={{ borderTop: '1px solid #ddd', padding: 8 }}>
        Footer
      </footer>
    </>
  );
}
