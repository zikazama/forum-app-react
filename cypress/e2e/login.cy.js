/* eslint-disable no-undef */
/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('[data-cy="email-input"]').should('be.visible')
    cy.get('[data-cy="password-input"]').should('be.visible')
    cy.get('[data-cy="submit-button"]').contains(/^Login$/).should('be.visible')
  })

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('[data-cy="submit-button"]').contains(/^Login$/).click()

    // memverifikasi log untuk menampilkan pesan dari API
    cy.on('log', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty')
    })
  })

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('[data-cy="email-input"]').type('testuser@gmail.com')

    // klik tombol login tanpa mengisi password
    cy.get('[data-cy="submit-button"]').contains(/^Login$/).click()

    // memverifikasi log untuk menampilkan pesan dari API
    cy.on('log', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty')
    })
  })

  it('should display alert when email and password are wrong', () => {
    // mengisi email
    cy.get('[data-cy="email-input"]').type('fauzi190198@gmail.com')

    // mengisi password yang salah
    cy.get('[data-cy="password-input"]').type('wrong_password')

    // menekan tombol Login
    cy.get('[data-cy="submit-button"]').contains(/^Login$/).click()

    // memverifikasi log untuk menampilkan pesan dari API
    cy.on('log', (str) => {
      expect(str).to.equal('email or password is wrong')
    })

    // close popup
    cy.get('button').contains(/^OK$/).click()
  })

  it('should display homepage when email and password are correct', () => {
    // mengisi email
    cy.get('[data-cy="email-input"]').type('fauzi190198@gmail.com')

    // mengisi password
    cy.get('[data-cy="password-input"]').type('123456')

    // menekan tombol Login
    cy.get('[data-cy="submit-button"]').contains(/^Login$/).click()

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('[data-cy="posting-button"]').contains('Posting').should('be.visible')
  })
})
