describe('Admin area', () => {
  it('creates and deletes a team member', () => {
    const timestamp = new Date().getTime();
    const teamMember = {
      firstName: `test-tm-first-name-${timestamp}`,
      lastName: `test-tm-last-name-${timestamp}`,
    };

    cy.visit('/admin/team-members/create');

    cy.get('[data-cy="admin-create-team-member-first-name"]').type(
      `${teamMember.firstName}`,
    );

    cy.get('[data-cy="admin-create-team-member-last-name"]').type(
      `${teamMember.lastName}{enter}`,
    );

    cy.get('[data-cy="team-member-page-content-h1"]').should('be.visible');

    cy.url().then((url) => {
      const newUrl = url.replace('/team/', '/admin/team-members/');

      cy.visit(newUrl);

      cy.get('[data-cy="admin-team-member-button-delete"]').click();

      cy.get('[data-cy="team-page-content-h1"]').should('be.visible');

      cy.get('[data-cy="team-page-content-team-members"]').should(
        'not.contain.text',
        teamMember.firstName,
      );
    });
  });
});
