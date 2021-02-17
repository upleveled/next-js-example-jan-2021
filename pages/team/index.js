import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

// 💥 Importing and using server-side code in this
// file at the top will not work! It will lead to
// errors such as:
//
// Module not found: Can't resolve 'fs'
// import { getTeamMembers } from '../../database';
// const teamMembers = getTeamMembers();

// Run Order 2. This code will run after the server
// code, and will have the props that were passed
// in from the getServerSideProps function.
export default function Team(props) {
  console.log('props', props);
  return (
    <Layout>
      <Head>
        <title>Team</title>
      </Head>

      <h1>Team page</h1>

      <ul>
        {props.teamMembers.map((teamMember) => (
          <li key={`team-member-${teamMember.id}`}>
            <Link href={`/team/${teamMember.id}`}>
              <a>
                {teamMember.firstName} {teamMember.lastName}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

// Run Order 1. This code will run first when you
// load the page, and allow you to get the props
// that the page needs
export async function getServerSideProps() {
  // ✅ Anything that we run in this function will get
  // run ONLY on the server.
  //
  // This allows us to run server-side code such as
  // connecting to a database, etc.

  // This static import...
  // import { getTeamMembers } from '../../database';
  // ...can also be written as a dynamic import, like this:
  const { getTeamMembers } = await import('../../util/database');

  const teamMembers = await getTeamMembers();

  return {
    props: {
      teamMembers: teamMembers,
    },
  };
}
