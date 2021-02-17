const teamMembers = [
  { first_name: 'Karl', last_name: 'Horky' },
  { first_name: 'Gabriel', last_name: 'Bui' },
  { first_name: 'Samy', last_name: 'Hajar' },
  { first_name: 'Johanna', last_name: 'Raihala' },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO team_members ${sql(teamMembers, 'first_name', 'last_name')}
  `;
};

exports.down = async (sql) => {
  for (const teamMember of teamMembers) {
    await sql`
      DELETE FROM
        team_members
      WHERE
        first_name = ${teamMember.first_name} AND last_name = ${teamMember.last_name}
    `;
  }
};
