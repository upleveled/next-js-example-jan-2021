import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';

// Read in the values from the .env file
// (which should be ignored in Git!)
require('dotenv-safe').config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    sql = postgres({ ssl: true });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }
  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}

export async function getTeamMembers() {
  const teamMembers = await sql`
    SELECT * FROM team_members
  `;

  return camelcaseRecords(teamMembers);
}

export async function getTeamMemberById(id) {
  const teamMembers = await sql`
    SELECT
      *
    FROM
      team_members
    WHERE
      id = ${id}
  `;

  return camelcaseRecords(teamMembers)[0];
}

export async function createTeamMember(firstName, lastName) {
  const teamMembers = await sql`
    INSERT INTO team_members
      (first_name, last_name)
    VALUES
      (${firstName}, ${lastName})
    RETURNING *
  `;

  return camelcaseRecords(teamMembers)[0];
}

export async function updateTeamMemberFirstNameById(id, firstName) {
  const teamMembers = await sql`
    UPDATE
      team_members
    SET
      first_name = ${firstName}
    WHERE
      id = ${id}
    RETURNING *
  `;

  return camelcaseRecords(teamMembers)[0];
}

export async function deleteTeamMemberById(id) {
  const teamMembers = await sql`
    DELETE FROM
      team_members
    WHERE
      id = ${id}
    RETURNING *
  `;

  return camelcaseRecords(teamMembers)[0];
}

// SQL Join
// Get information from multiple tables
export async function getTeamMemberWithRoleById(id) {
  const teamMembers = await sql`
    SELECT
      team_members.id as team_member_id,
      team_members.first_name as first_name,
      team_members.last_name as last_name,
      roles.name as role_name
    FROM
      team_members,
      roles
    WHERE
      team_members.id = ${id} AND
      team_members.role_id = roles.id
  `;

  return camelcaseRecords(teamMembers)[0];
}
