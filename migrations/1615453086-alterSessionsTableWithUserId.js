exports.up = async (sql) => {
  await sql`
    ALTER TABLE
      sessions
    ADD COLUMN
      user_id INT REFERENCES users (id)
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE
      sessions
    DROP COLUMN
      user_id
  `;
};
