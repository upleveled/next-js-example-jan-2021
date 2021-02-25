describe('Navigation', () => {
  it('can navigate using the header links', () => {
    // Open the browser to the dev server URL
    cy.visit('/');

    // Get the element corresponding to the image in the home page...
    cy.get('[data-cy="home-page-content-image"]')
      // ...and test that it is visible
      .should('be.visible');

    // Get the header link element corresponding to the About link...
    cy.get('[data-cy="header-about"]')
      // ...and click on that element
      .click();

    // Get the element corresponding to the H1 in the About page...
    cy.get('[data-cy="about-page-content-h1"]')
      // ...and test that it is visible
      .should('be.visible');

    cy.get('[data-cy="header-team"]').click();

    cy.get('[data-cy="team-page-content-h1"]').should('be.visible');

    cy.get('[data-cy="team-page-content-team-member"]').should(
      'have.length.at.least',
      1,
    );

    // Get all of the team member `li` elements...
    cy.get('[data-cy="team-page-content-team-member"]')
      // ...filter it to just the first one...
      .first()
      // ...find the link inside of it
      .find('a')
      .click();

    cy.get('[data-cy="team-member-page-content-h1"]').should('be.visible');
  });
});
