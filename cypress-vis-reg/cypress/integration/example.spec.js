describe('My First Test', () => {
    it('Target Single Element', () => {
        cy.visit('http://www.google.com')
        cy.title().should('eq', 'Google')
        cy.get('#tsf')
        .compareSnapshot("SearchBox", {
            capture: 'fullPage',
            errorThreshold: 0.01
        })
    })

    it('Full Page', () => {
        cy.visit('http://www.google.com')
        cy.title().should('eq', 'Google')
        cy.compareSnapshot('searchFullPage', {
            capture: 'fullPage',
            errorThreshold: 0.1
          });
    })

    
    it('Viewport Full Page', () => {
        cy.visit('http://www.google.com')
        cy.title().should('eq', 'Google')
        cy.viewport('iphone-6')
        cy.compareSnapshot('iphone6ViewPortPage', {
            capture: 'viewport',
            errorThreshold: 0.1
          });
    })
    
    it('Full Page with Blackout', () => {
        cy.visit('http://www.google.com')
        cy.title().should('eq', 'Google')
        cy.compareSnapshot('fullPageWithBlackOut', {
            capture: 'viewport',
            errorThreshold: 0.1,
            blackout: ['#prm']
          });
    })
  })