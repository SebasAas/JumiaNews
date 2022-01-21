describe('Test Section Components', () => {
  it('loads successfully', () => {
    cy.visit('http://localhost:9000/section/sports')
  })

  it('should show 10 news by default', () => {
    cy.get('[data-cy="section-search"]')
      .within(() => {
        cy.get('.card__container')
          .should('have.length', '10')
      })
  })

  it('should be able to change the sort type', () => {
    cy.get('select')
      .should('have.value', 'relevance')

    cy.get('select')
      .eq(0)
      .select('Newest')
      .should('have.value', 'newest')
  })

  it('should be disabled back button section news at the beginning', () => {
    cy.get('[data-cy="section-search"]')
      .within(() => {
        cy.get('button').first()
          .should('be.disabled')
      })
  })

  it('should be enable back button section news after first page', () => {
    cy.get('[data-cy="section-search"]')
      .within(() => {
        cy.get('button').last().click()
        cy.get('button').first()
          .should('be.enabled')
      })
  })

})