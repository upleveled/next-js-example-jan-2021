import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';

export default function EditTeamMember(props) {
  const router = useRouter();
  const [firstName, setFirstName] = useState(props.teamMember?.firstName);
  const [draftFirstName, setDraftFirstName] = useState(firstName);

  if (!props.teamMember) {
    return (
      <Layout>
        <Head>
          <title>Team Member Not Found</title>
        </Head>
        <h1>Team Member Not Found</h1>
        <p>Did you mean ...?</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Edit Team Member</title>
      </Head>
      <h1>Edit Team Member page</h1>
      <h2>id: {props.teamMember.id}</h2>
      <h2>First name</h2>
      <input
        value={draftFirstName}
        onChange={(event) => setDraftFirstName(event.currentTarget.value)}
      />
      <button
        onClick={async () => {
          const response = await fetch(`/api/${props.teamMember.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName: draftFirstName }),
          });
          const teamMember = await response.json();
          setFirstName(teamMember.firstName);
          alert('Team member updated!');
        }}
      >
        Change first name
      </button>
      <button
        onClick={() => {
          setDraftFirstName(firstName);
        }}
      >
        Reset first name
      </button>
      <br />
      For testing purposes only, current first name: {firstName}
      <h1>Danger Zone</h1>
      <p>
        <button
          onClick={async () => {
            const confirmed = window.confirm('Really delete?');
            if (!confirmed) return;
            await fetch(`/api/${props.teamMember.id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            router.push('/team');
          }}
          style={{ background: 'red', color: 'white' }}
        >
          Delete
        </button>
      </p>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getTeamMemberById } = await import('../../../util/database');

  // Query will also include the query parameters from the URL
  // (the bit after the question mark eg. `?asdf=1`)
  // console.log('query', context.query);
  // console.log('params', context.params);

  const id = context.query.teamMemberId;

  const teamMember = await getTeamMemberById(id);

  if (!teamMember) {
    context.res.statusCode = 404;
  }

  // 1. Read the cookie the first time
  const visits = context.req.cookies.visits;
  const visitsCookieValue = visits ? JSON.parse(visits) : [];

  return {
    props: {
      teamMember: teamMember || null,
      visitsCookieValue: visitsCookieValue,
    },
  };
}
