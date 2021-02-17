exports.up = async (sql) => {
  await sql`
    CREATE TABLE team_members (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      first_name VARCHAR(40),
      last_name VARCHAR(40)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE team_members
  `;
};
