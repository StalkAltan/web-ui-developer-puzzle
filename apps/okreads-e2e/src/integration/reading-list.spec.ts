describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');

    cy.request('POST', '/api/reading-list/reset', {});
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should be able to remove a book and undo that removal', () => {
    // Search and add a new book
    cy.get('input[type="search"]').type('giraffes');
    cy.get('form').submit();
    cy.get('[data-testing="add-book-to-list"]').first().click();

    // Open reading list and remove book
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="remove-book"').first().click();

    // Verify toast appears and click 'undo'
    cy.get('simple-snack-bar > span').should('contain.text', 'Removed');
    cy.get('#cdk-overlay-1 > snack-bar-container > simple-snack-bar > div > button').first().click()

    // Reading list should contain at least one item again
    cy.get('.reading-list-item').its('length').should('be.gt', 0);
  })
});
