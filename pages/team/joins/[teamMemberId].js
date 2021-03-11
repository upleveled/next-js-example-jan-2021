import Head from 'next/head';

export default function SingleTeamMember(props) {
  if (!props.teamMember) {
    return (
      <>
        <Head>
          <title>Team Member Not Found</title>
        </Head>
        <h1>Team Member Not Found</h1>
        <p>Did you mean ...?</p>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Single Team Member</title>
      </Head>

      <h1>Single Team Member page</h1>

      <h2>id: {props.teamMember.teamMemberId}</h2>
      <h2>First name: {props.teamMember.firstName}</h2>
      <h2>Last name: {props.teamMember.lastName}</h2>
      <h2>Role name: {props.teamMember.roleName}</h2>
    </>
  );
}

export async function getServerSideProps(context) {
  const { getTeamMemberWithRoleById } = await import('../../../util/database');

  const id = context.query.teamMemberId;
  const teamMember = await getTeamMemberWithRoleById(id);

  if (!teamMember) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      teamMember: teamMember || null,
    },
  };
}
