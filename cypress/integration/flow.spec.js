describe('Testing News', () => {
  it('loads successfully', () => {
    cy.visit('http://localhost:9000')
  })

  it('search by text', () => {
    cy.get('nav')
      .within(() => {
        cy.get('input').eq(1).clear().type('New York Time')
          .should('have.value', 'New York Time')
      })
  })

  it('navigate to specific news', () => {
    cy.wait(3000);
    cy.get('.card__container').eq(1).children().children().click()
  })

  it('go back to home', () => {
    cy.get('[href="/"] > [data-testid="logo"]').click()
  })

  it('search by NavLink', () => {
    cy.contains('Health').click()

  })

  it('should change the title of section', () => {
    cy.contains('Health')
      .should('be.visible')
  })

  it('navigate to specific news', () => {
    cy.wait(3000);
    cy.get('.card__container').eq(1).children().children().click()
  })

  it('navigate to another news from related news', () => {
    cy.wait(1000);
    cy.get('.relatednew__container').eq(0).children().children().eq(2).click()
  })

});