import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '../../../components/Layout';

export default function CreateTeamMember() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>Add a new team member</title>
      </Head>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('/api', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstName: firstName, lastName: lastName }),
          });
          const teamMember = await response.json();
          router.push(`/team/${teamMember.id}`);
        }}
      >
        <label>
          First name
          <input
            value={firstName}
            onChange={(event) => {
              setFirstName(event.currentTarget.value);
            }}
          />
        </label>
        <label>
          Last name
          <input
            value={lastName}
            onChange={(event) => {
              setLastName(event.currentTarget.value);
            }}
          />
        </label>

        <button>Add Team Member</button>
      </form>
    </Layout>
  );
}
