exports.up = async (sql) => {
  await sql`
    ALTER TABLE
      team_members
    ADD COLUMN
      role_id INT REFERENCES roles (id)
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE
      team_members
    DROP COLUMN
      role_id
  `;
};
