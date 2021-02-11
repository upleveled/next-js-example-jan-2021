import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import {
  incrementVisitsByTeamMember,
  setVisitsCookieClientSide,
} from '../../util/cookies';

export default function SingleTeamMember(props) {
  // useEffect(
  //   () => {
  //     const visits = Number(Cookies.get('visits'));
  //     Cookies.set('visits', visits + 1);
  //   },
  //   // Empty dependency array: run this function
  //   // when the component is first "mounted"
  //   //
  //   // Effectively, this means that this function above
  //   // will run once per page load
  //   [],
  // );

  // 2. Initialize a state variable with the value from the
  // cookie (read in getServerSideProps)
  const [visits, setVisits] = useState(props.visitsCookieValue);

  // 5. Every time the state variable updates, synchronize
  // that value to the cookie on the client-side (this will
  // also be sent to the server the next time the page is
  // refreshed or loaded)
  useEffect(() => {
    setVisitsCookieClientSide(visits);
  }, [visits]);

  const visitsForTeamMember = visits.find(
    (teamMemberVisits) => teamMemberVisits.teamMemberId === props.teamMember.id,
  );

  return (
    <Layout>
      <Head>
        <title>Single Team Member</title>
      </Head>

      <h1>Single Team Member page</h1>

      <h2>id: {props.teamMember.id}</h2>
      <h2>First name: {props.teamMember.firstName}</h2>
      <h2>Last name: {props.teamMember.lastName}</h2>

      {/*
        3. Show the value on the page
      */}
      <div>number of visits: {visitsForTeamMember?.visits || 0}</div>

      <button
        onClick={() => {
          // 4. Set a new value for the state variable
          // with the updated visit count
          const newVisits = incrementVisitsByTeamMember(
            visits,
            props.teamMember.id,
          );
          setVisits(newVisits);
        }}
      >
        increase visits
      </button>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getTeamMembers } = await import('../../util/database');

  // Query will also include the query parameters from the URL
  // (the bit after the question mark eg. `?asdf=1`)
  // console.log('query', context.query);
  // console.log('params', context.params);

  const id = context.query.teamMemberId;

  const teamMembers = getTeamMembers();
  const teamMember = teamMembers.find((member) => member.id === id);

  // 1. Read the cookie the first time
  const visits = context.req.cookies.visits;
  const visitsCookieValue = visits ? JSON.parse(visits) : [];

  return {
    props: {
      teamMember: teamMember,
      visitsCookieValue: visitsCookieValue,
    },
  };
}
