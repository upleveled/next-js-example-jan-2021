import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);

  async function handleClick() {
    const response = await fetch('/api');
    const newTeamMembers = await response.json();
    setTeamMembers(newTeamMembers.teamMembers);
  }

  return (
    <Layout>
      <Head>
        <title>Team</title>
      </Head>

      <h1>Team page</h1>

      <button onClick={handleClick}>Load team members</button>

      <ul>
        {teamMembers.map((teamMember) => (
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
