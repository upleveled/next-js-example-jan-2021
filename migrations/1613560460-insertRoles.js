const roles = [
  { name: 'Founder' },
  { name: 'Developer' },
  { name: 'Marketing' },
  { name: 'Head of Sales' },
];

exports.up = async (sql) => {
  await sql`INSERT INTO roles ${sql(roles, 'name')}`;
};

exports.down = async (sql) => {
  for (const role of roles) {
    await sql`
      DELETE FROM
        roles
      WHERE
        name = ${role.name}
    `;
  }
};
