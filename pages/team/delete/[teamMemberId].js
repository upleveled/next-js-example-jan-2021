import Head from 'next/head';

export default function DeleteTeamMember(props) {
  if (!props.teamMember) {
    return <div>Team member id doesn't exist!</div>;
  }

  return (
    <>
      <Head>
        <title>Deleted a team member!</title>
      </Head>

      <h1>Delete successful!</h1>

      <p>Deleted team member with the following details:</p>

      <div>id: {props.teamMember.id}</div>
      <div>first name: {props.teamMember.firstName}</div>
      <div>last name: {props.teamMember.lastName}</div>
    </>
  );
}

// This is just for demo purposes
//
// You should instead use API Routes
export async function getServerSideProps(context) {
  const { deleteTeamMemberById } = await import('../../../util/database');

  const id = context.query.teamMemberId;
  const teamMember = await deleteTeamMemberById(id);

  return {
    props: {
      teamMember: teamMember || null,
    },
  };
}
