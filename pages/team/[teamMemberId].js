import Head from 'next/head';
import Layout from '../../components/Layout';

export default function SingleTeamMember(props) {
  return (
    <Layout>
      <Head>
        <title>Single Team Member</title>
      </Head>

      <h1>Single Team Member page</h1>

      <h2>id: {props.teamMember.id}</h2>
      <h2>First name: {props.teamMember.firstName}</h2>
      <h2>Last name: {props.teamMember.lastName}</h2>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getTeamMembers } = await import('../../database');

  // Query will also include the query parameters from the URL
  // (the bit after the question mark eg. `?asdf=1`)
  // console.log('query', context.query);
  // console.log('params', context.params);

  const id = context.query.teamMemberId;

  const teamMembers = getTeamMembers();
  const teamMember = teamMembers.find((member) => member.id === id);

  return {
    props: {
      teamMember: teamMember,
    },
  };
}
