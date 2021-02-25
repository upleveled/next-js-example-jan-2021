import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import Layout from '../../../components/Layout';

export default function CreateTeamMember() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const router = useRouter();

  function handleFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    setFirstName(event.currentTarget.value);
  }

  function handleLastNameChange(event: ChangeEvent<HTMLInputElement>) {
    setLastName(event.currentTarget.value);
  }

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
            data-cy="admin-create-team-member-first-name"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </label>
        <label>
          Last name
          <input
            data-cy="admin-create-team-member-last-name"
            value={lastName}
            onChange={handleLastNameChange}
          />
        </label>

        <button type="submit">Add Team Member</button>
      </form>
    </Layout>
  );
}
