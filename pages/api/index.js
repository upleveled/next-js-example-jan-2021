import { createTeamMember, getTeamMembers } from '../../util/database';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const teamMembers = await getTeamMembers();
    res.json({ teamMembers: teamMembers });
  }

  if (req.method === 'POST') {
    const teamMember = await createTeamMember(
      req.body.firstName,
      req.body.lastName,
    );
    res.json(teamMember);
  }
}
