Cypress.Commands.add('createBlog', ({ content, important }) => {
    cy.request({
      url: 'http://localhost:3001/api/notes',
      method: 'POST',
      body: { content, important },
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
      }
    })
  
    cy.visit('http://localhost:3000')
  })