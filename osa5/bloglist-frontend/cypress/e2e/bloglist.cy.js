describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Lauri Leppänen',
      username: 'spede22',
      password: 'salainen'
    }
    const user2 = {
      name: 'Suvi Leppänen',
      username: 'suge05',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeed with correct credentials', function() {
      cy.get('#username').type('spede22')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Lauri Leppänen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('spede22')
      cy.get('#password').type('kalainen')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('spede22')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Lauri Leppänen logged in')
      cy.contains('create new blog').click()
      cy.get('#title').type('cypress testi')
      cy.get('#author').type('Elon Musk')
      cy.get('#url').type('www.tesla.com')
      cy.get('#create-button').click()
      cy.wait(6000)
      cy.contains('cypress testi')
    })

    describe('Blog exists', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('cypress testi')
        cy.get('#author').type('Elon Musk')
        cy.get('#url').type('www.tesla.com')
        cy.get('#create-button').click()
        cy.get('#view-button').click()
      })

      it('Created blog can be liked', function() {
        cy.contains('like').click()
        cy.contains('likes').contains('1')
      })

      it('Blog can be removed', function() {
        cy.contains('remove').click()
        cy.contains('cypress testi').should('not.exist') 
      })

      it('remove-button only visible for creator', function() {
        cy.contains('logout').click()
        cy.get('#username').type('suge05')
        cy.get('#password').type('salainen')
        cy.get('#login-button').click()
        cy.get('#view-button').click()
        cy.contains('remove').should('not.exist')
      })
      
    })

    describe('The blogs with most likes first', function() {
      beforeEach(function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('vähiten ääniä')
        cy.get('#author').type('vikanen')
        cy.get('#url').type('www.vika.com')
        cy.get('#create-button').click()

        cy.contains('create new blog').click()
        cy.get('#title').type('eka')
        cy.get('#author').type('ekanen')
        cy.get('#url').type('www.eka.com')
        cy.get('#create-button').click()

        cy.contains('create new blog').click()
        cy.get('#title').type('toka')
        cy.get('#author').type('tokanen')
        cy.get('#url').type('www.toka.com')
        cy.get('#create-button').click()
        cy.wait(1000)
      }) 

      it.only('The blogs are ordered by likes', function() {
        cy.get('button:contains("view")').then( buttons => {
          console.log('number of buttons', buttons.length)
          for (let i=0; i<buttons.length; i++) {
            cy.wrap(buttons[i]).click()
            
          }
          
        })

        cy.get('.blog').eq(1).contains('like').click()
        cy.wait(1000)
        cy.get('.blog').eq(0).contains('like').click()
        cy.wait(1000)
        cy.get('.blog').eq(2).contains('like').click()
        cy.wait(1000)

        cy.get('.blog').eq(0).contains('eka')
        cy.get('.blog').eq(1).contains('toka')

      })
    })
    
  })
})