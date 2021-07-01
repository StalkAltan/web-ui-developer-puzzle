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

  it('Then: I should be able to add books to my list and mark them as read', () => {
    // Add book to reading list
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="add-book-to-list"]').first().click();

    // Open reading list and mark as read, then close reading list
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="finish-book"]').first().click();
    cy.get('[data-testing="close-reading-list"]').click()

    // Verify book is marked as complete
    cy.get('[data-testing="add-book-to-list"]').first().should('contain.text', 'Finished');

    // Open reading list and remove book
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="remove-book"]').first().click();
    cy.get('[data-testing="close-reading-list"]').click()

    // Verify book is no longer marked as added or finished
    cy.get('[data-testing="add-book-to-list"]').first().should('contain.text', 'Want to Read');
  })
});
