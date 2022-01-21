describe('Test Home Components', () => {
  it('loads successfully', () => {
    cy.visit('http://localhost:9000')
    cy.wait(3000);
  })

  it("should have default values in navbar", () => {
    cy.get('nav')
      .should('be.visible')
      .within(() => {
        cy.get('[href="/"] > [data-testid="logo"]')
          .should('be.visible')
        cy.get('a')
          .should('contain.text', 'Sports')
          .should('contain.text', 'Politics')
          .should('contain.text', 'Health')
          .should('contain.text', 'Technology')
        cy.get('input')
          .should('be.visible')
      })
  })

  it('should change the status of searchbox', () => {
    cy.get('nav')
      .within(() => {
        cy.get('input').eq(1).trigger('mouseover')
          .should('have.css', 'border-color', 'rgb(150, 150, 150)')
        cy.get('input').eq(1).click()
          .should('have.css', 'border-color', 'rgb(255, 123, 81)')
      })

  })

  it('should allow to write and clear data from the searchbox', () => {
    cy.get('nav')
      .within(() => {
        cy.get('input').eq(1).clear().type('New York Time')
          .should('have.value', 'New York Time')
        cy.get('input').eq(1).clear().blur()
          .should('have.value', '')
      })
  })

  it('should show 18 news in the home', () => {
    cy.get('.card__container')
      .should('have.length', '18')
  })

  it('should show 4 news by default in top (highlights)', () => {
    cy.get('[data-cy="highlight-news"]')
      .within(() => {
        cy.get('.card__container')
          .should('have.length', '4')
      })
  })

  it('should show 8 news by default in top news section', () => {
    cy.get('[data-cy="top-news"]')
      .within(() => {
        cy.get('.card__container')
          .should('have.length', '8')
      })
  })

  it('should show 16 news before click in see more top news section', () => {
    cy.get('[data-cy="top-news"]')
      .within(() => {
        cy.get('button').click({ force: true })
        cy.wait(1000)
        cy.get('.card__container')
          .should('have.length', '16')
      })
  })

  it('should be 6 news  by default in section sports', () => {
    cy.get('[data-cy="section-news"]')
      .within(() => {
        cy.get('.card__container')
          .should('have.length', '6')
      })
  })

  it('should change the active class on click list section news', () => {
    cy.get('[data-cy="section-news"]')
      .within(() => {
        cy.get('li').contains('Sports')
          .should('have.css', 'border-bottom', '2px solid rgb(255, 123, 81)')
        cy.get('li').contains('World').click()
          .should('have.css', 'border-bottom', '2px solid rgb(255, 123, 81)')
        cy.get('li').contains('Sports')
          .should('have.not.css', 'border-bottom', '2px solid rgb(255, 123, 81)')
      })
  })

  it('should be disabled back button section news at the beginning', () => {
    cy.get('[data-cy="section-news"]')
      .within(() => {
        cy.get('button').first()
          .should('be.disabled')
      })
  })

  it('should be enable back button section news after first page', () => {
    cy.get('[data-cy="section-news"]')
      .within(() => {
        cy.get('button').last().click()
        cy.get('button').first()
          .should('be.enabled')
      })
  })


  it("should change theme mode in localStorage", () => {
    cy.get('[data-cy="theme-mode"]').click().should(() => {
      expect(localStorage.getItem('theme')).to.eq('dark')
    })
  })
})