exports.up = async (sql) => {
  await sql`
    CREATE TABLE users (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      username VARCHAR(40) UNIQUE,
      password_hash VARCHAR(100)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE users
  `;
};
