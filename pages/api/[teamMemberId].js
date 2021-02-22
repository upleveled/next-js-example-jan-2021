import {
  deleteTeamMemberById,
  updateTeamMemberFirstNameById,
} from '../../util/database';

export default async function handler(req, res) {
  const id = req.query.teamMemberId;

  if (req.method === 'PATCH') {
    const updatedTeamMember = await updateTeamMemberFirstNameById(
      id,
      req.body.firstName,
    );
    res.json(updatedTeamMember);
  }

  if (req.method === 'DELETE') {
    const deletedTeamMember = await deleteTeamMemberById(id);
    res.json(deletedTeamMember);
  }
}
