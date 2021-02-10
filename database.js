// 💥 DON'T COPY THIS - THIS IS JUST A SIMULATION OF SOMETHING
// THAT WOULD ONLY WORK SERVER-SIDE
import fs from 'fs';
console.log(fs && '');

export function getTeamMembers() {
  // TODO: Really connect to a database

  return [
    { id: '0', firstName: 'Karl', lastName: 'H' },
    { id: '1', firstName: 'Samy', lastName: 'H' },
    { id: '2', firstName: 'Gabriel', lastName: 'B' },
    { id: '3', firstName: 'Patrick', lastName: 'B' },
  ];
}
