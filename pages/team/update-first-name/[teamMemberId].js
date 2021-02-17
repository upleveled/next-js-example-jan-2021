import Head from 'next/head';
import Layout from '../../../components/Layout';

export default function UpdateFirstNameOfTeamMember(props) {
  if (!props.teamMember) {
    return <div>Team member id doesn't exist!</div>;
  }

  return (
    <Layout>
      <Head>
        <title>Updated a team member first name!</title>
      </Head>

      <h1>Update successful!</h1>

      <p>
        Update team member first name to 'Emilia' with the following details:
      </p>

      <div>id: {props.teamMember.id}</div>
      <div>first name: {props.teamMember.firstName}</div>
      <div>last name: {props.teamMember.lastName}</div>
    </Layout>
  );
}

// This is just for demo purposes
//
// You should instead use API Routes
export async function getServerSideProps(context) {
  const { updateTeamMemberFirstNameById } = await import(
    '../../../util/database'
  );

  const id = context.query.teamMemberId;
  const teamMember = await updateTeamMemberFirstNameById(id, 'Emilia');

  return {
    props: {
      teamMember: teamMember || null,
    },
  };
}
