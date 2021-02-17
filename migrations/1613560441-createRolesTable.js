exports.up = async (sql) => {
  await sql`
    CREATE TABLE roles (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name VARCHAR(20)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE roles
  `;
};
