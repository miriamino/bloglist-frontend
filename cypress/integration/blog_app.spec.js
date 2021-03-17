const { _ } = Cypress

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Pu Muckel',
      username: 'pumuckel',
      password: 'schabernack'
    }
    const user2 = {
      name: 'Meister Eder',
      username: 'franzeder',
      password: 'zefix'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  // it('Login form is shown', function () {
  //   cy.contains('log in to application')
  //   cy.contains('username')
  //   cy.contains('password')
  //   cy.contains('login')
  // })

  // describe('Login', function () {
  //   it('succeeds with correct credentials', function () {
  //     cy.contains('login').click()
  //     cy.get('#username').type('pumuckel')
  //     cy.get('#password').type('schabernack')
  //     cy.get('#log-in').click()
  //     cy.contains('logout').click()
  //   })

  //   it('fails with wrong credentials', function () {
  //     cy.contains('login').click()
  //     cy.get('#username').type('pumuckel')
  //     cy.get('#password').type('schmarrn')
  //     cy.get('#log-in').click()
  //     cy.get('html').should('not.contain', 'Pu Muckel logged in')
  //     cy.get('html').should('contain', 'Wrong credentials')
  //     cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  //   })
  // })
  // describe('when logged in', function () {
  //   beforeEach(function () {
  //     cy.login({ username: 'pumuckel', password: 'schabernack' })
  //   })
  //   it('A blog can be created', function () {
  //     cy.contains('new blog').click()
  //     cy.get('#title').type('Meine Werkstatt')
  //     cy.get('#author').type('Meister Eder')
  //     cy.get('#url').type('https://example.com/')
  //     cy.get('#create').click()
  //     cy.contains('a new blog Meine Werkstatt by Meister Eder added')
  //     cy.contains('Meine Werkstatt Meister Eder')
  //   })

  //   it('and added to the list of all blogs', function () {
  //     cy.createBlog({ title: 'some title1', author: 'some author1', url: 'example.fi' })
  //     cy.createBlog({ title: 'some title2', author: 'some author2', url: 'example.org' })
  //     cy.createBlog({ title: 'some title3', author: 'some author3', url: 'example.com' })
  //     cy.get('.Blog').should('have.length', 3)
  //   })
  // })
  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'pumuckel', password: 'schabernack' })
    })
    // it('A blog can be created', function () {
    //   cy.contains('new blog').click()
    //   cy.get('#title').type('Meine Werkstatt')
    //   cy.get('#author').type('Meister Eder')
    //   cy.get('#url').type('https://example.com/')
    //   cy.get('#create').click()
    //   cy.contains('a new blog Meine Werkstatt by Meister Eder added')
    //   cy.contains('Meine Werkstatt Meister Eder')
    // })

    // it('and added to the list of all blogs', function () {
    //   cy.createBlog({ title: 'some title1', author: 'some author1', url: 'example.fi' })
    //   cy.createBlog({ title: 'some title2', author: 'some author2', url: 'example.org' })
    //   cy.createBlog({ title: 'some title3', author: 'some author3', url: 'example.com' })
    //   cy.get('.Blog').should('have.length', 3)
    // })

    describe('and some blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'some title1', author: 'some author1', url: 'example.fi', likes: 6 })
        cy.createBlog({ title: 'some title2', author: 'some author2', url: 'example.org', likes: 7 })
        cy.createBlog({ title: 'some title3', author: 'some author3', url: 'example.com', likes: 5 })
        cy.contains('logout').click()
        cy.login({ username: 'franzeder', password: 'zefix' })
        cy.createBlog({ title: 'some title4', author: 'some author4', url: 'example.to', likes: 2 })
      })

      // it('a blog can be liked', function () {
      //   cy.get('#blog3').contains('view').click()
      //   cy.get('#blog3').contains('like').click()
      //   cy.get('.Blog').should('contain', '6')
      // })

      // it('the user who created a blog can delete it', function(){
      //   cy.get('#blog4').contains('view').click()
      //   cy.get('#blog4').contains('remove').click()
      //   cy.get('.Blog').should('have.length', 3)
      // })

      // it('only the user who created a blog can delete it', function(){
      //   cy.get('#blog1').contains('view').click()
      //   cy.get('#blog1').should('not.contain', 'remove')
      // })

      it('blogs are ordered according to likes', function () {
        cy.get('.Blog').each(blog => cy.wrap(blog).contains('view').click())
        cy.get('.Blog').each(blog =>
          cy.wrap(blog).find('#likes').invoke('text')
        ).then(likes => {
          const sorted = _.sortBy(likes)
          const likeList = _.map(likes)
          expect(sorted).to.deep.equal(likeList)
          console.log(sorted)
        })
        cy.contains('title3').find('#likeBtn').click().click().click().click()
        cy.get('.Blog').each(blog =>
          cy.wrap(blog).find('#likes').invoke('text')
        ).then(likes => {
          const sorted = _.sortBy(likes)
          const likeList = _.map(likes)
          expect(sorted).to.deep.equal(likeList)
          console.log(sorted)
        })
      })
    })
  })
})