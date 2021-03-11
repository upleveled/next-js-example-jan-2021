import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';
import { generateToken } from './sessions';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();

// Read in the values from the .env file
// (which should be ignored in Git!)
require('dotenv-safe').config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
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

export async function getSessionByToken(sessionToken) {
  if (!sessionToken) {
    return undefined;
  }

  const sessions = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return camelcaseRecords(sessions)[0];
}

export async function isSessionTokenNotExpired(sessionToken) {
  const sessions = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return sessions.length > 0;
}

export async function createSessionWithFiveMinuteExpiry() {
  const token = generateToken();

  const sessions = await sql`
    INSERT INTO sessions
      (token, expiry)
    VALUES
      (${token}, NOW() + INTERVAL '5 minutes')
    RETURNING *
  `;

  return camelcaseRecords(sessions)[0];
}

export async function createSessionByUserId(userId) {
  const token = generateToken();

  const sessions = await sql`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *
  `;

  return camelcaseRecords(sessions)[0];
}

export async function deleteSessionById(id) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      id = ${id}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteSessionByToken(token) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteAllExpiredSessions() {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function getUserById(id) {
  const users = await sql`
    SELECT
      id,
      username
    FROM
      users
    WHERE
      id = ${id}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserByUsername(username) {
  const users = await sql`
    SELECT
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserWithHashedPasswordByUsername(username) {
  const users = await sql`
    SELECT
      *
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

export async function createUser(username, passwordHash) {
  const users = await sql`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${passwordHash})
    RETURNING id, username
  `;
  return camelcaseRecords(users)[0];
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
