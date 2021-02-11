import Cookies from 'js-cookie';

// Each element needs BOTH visits and some reference to the team member
// const visitsCookieValue = [
//   {
//     teamMemberId: 0,
//     visits: 2,
//   },
//   {
//     teamMemberId: 1,
//     visits: 7,
//   },
// ];

export function incrementVisitsByTeamMember(visitsCookieValue, teamMemberId) {
  // Find if the teamMemberId matches any of the array elements
  const idInArray = visitsCookieValue.some(
    (teamMemberVisits) => teamMemberVisits.teamMemberId === teamMemberId,
  );

  // If the array doesn't contain an element with the teamMemberId,
  // then add a new array element at the end
  if (!idInArray) {
    return [
      ...visitsCookieValue,
      {
        teamMemberId: teamMemberId,
        visits: 1,
      },
    ];
  }

  // If the array does contain an element matching the
  // teamMemberId, increase the number of visits in that
  // element by 1
  return visitsCookieValue.map((teamMemberVisits) => {
    if (teamMemberId === teamMemberVisits.teamMemberId) {
      teamMemberVisits.visits = teamMemberVisits.visits + 1;
    }
    return teamMemberVisits;
  });
}

export function setVisitsCookieClientSide(newVisits) {
  Cookies.set('visits', newVisits);
}
