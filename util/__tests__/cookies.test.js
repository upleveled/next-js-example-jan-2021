import { incrementVisitsByTeamMember } from '../cookies';

const teamMemberIdToAdd = 1;

test('add new team member when cookie is empty', () => {
  const visitsCookieValue = [];
  const result = incrementVisitsByTeamMember(
    visitsCookieValue,
    teamMemberIdToAdd,
  );
  expect(result).toEqual([{ teamMemberId: teamMemberIdToAdd, visits: 1 }]);
});

test('add new team member when cookie contains non-matching team member', () => {
  const visitsCookieValue = [{ teamMemberId: 2, visits: 2 }];
  const result = incrementVisitsByTeamMember(
    visitsCookieValue,
    teamMemberIdToAdd,
  );
  expect(result).toEqual([
    ...visitsCookieValue,
    { teamMemberId: teamMemberIdToAdd, visits: 1 },
  ]);
});

test('increment team member visits when cookie contains matching team member', () => {
  const visitsCookieValue = [{ teamMemberId: teamMemberIdToAdd, visits: 2 }];
  const result = incrementVisitsByTeamMember(
    visitsCookieValue,
    teamMemberIdToAdd,
  );
  expect(result).toEqual([{ teamMemberId: teamMemberIdToAdd, visits: 3 }]);
});
