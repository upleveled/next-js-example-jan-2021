describe('Navigation', () => {
  it('can navigate using the header links', () => {
    // Open the browser to the dev server URL
    cy.visit('/team');

    cy.get('[data-cy="team-page-content-team-member"]').should(
      'have.length.at.least',
      1,
    );

    cy.get('[data-cy="team-page-content-team-member"]')
      // Get the first element in the teamMembers elements
      .eq(0)
      .find('a')
      .click();

    cy.get('[data-cy="team-member-page-content-h1"]').should('be.visible');

    cy.get('[data-cy="team-members-page-content-visits"]')
      .should('be.visible')
      .should('contain.text', '0');

    // Increase the number of visits
    cy.get(
      '[data-cy="team-members-page-content-button-increase-visits"]',
    ).click();

    cy.get('[data-cy="team-members-page-content-visits"]').should(
      'contain.text',
      '1',
    );

    cy.get(
      '[data-cy="team-members-page-content-button-increase-visits"]',
    ).click();
    cy.get(
      '[data-cy="team-members-page-content-button-increase-visits"]',
    ).click();
    cy.get(
      '[data-cy="team-members-page-content-button-increase-visits"]',
    ).click();

    cy.get('[data-cy="team-members-page-content-visits"]').should(
      'contain.text',
      '4',
    );

    cy.go('back');

    cy.get('[data-cy="team-page-content-team-member"]')
      // Get the second element in the teamMembers elements
      .eq(1)
      .find('a')
      .click();

    // Make sure that the change in visits for the first team
    // member didn't affect the second team member's visits
    cy.get('[data-cy="team-members-page-content-visits"]')
      .should('be.visible')
      // This time, we're doing a stricter matching,
      // using a regular expression. This makes sure that
      // we don't have a zero just somewhere in the text
      // of the element
      .invoke('text')
      .should('match', /^0$/);
  });
});
