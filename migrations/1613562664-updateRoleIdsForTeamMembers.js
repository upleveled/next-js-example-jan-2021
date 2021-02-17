const teamMemberRoles = [
  { teamMemberId: 1, roleId: 2 },
  { teamMemberId: 2, roleId: 3 },
  { teamMemberId: 3, roleId: 4 },
  { teamMemberId: 4, roleId: 1 },
];

exports.up = async (sql) => {
  for (const teamMemberRole of teamMemberRoles) {
    await sql`
      UPDATE
        team_members
      SET
        role_id = ${teamMemberRole.roleId}
      WHERE
        id = ${teamMemberRole.teamMemberId}
    `;
  }
};

exports.down = async (sql) => {
  for (const teamMemberRole of teamMemberRoles) {
    await sql`
      UPDATE
        team_members
      SET
        role_id = NULL
      WHERE
        id = ${teamMemberRole.teamMemberId}
    `;
  }
};
