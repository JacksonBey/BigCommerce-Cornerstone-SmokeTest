before(() => {
  cy.clearCookies()
  cy.clearLocalStorage()
})

// Page Load
describe('Homepage', () => {
  it('Loads', () => {
    cy.bcVisit('/')
  })
})

// Successful Login
describe('Login', () => {
  it('Successfully Login', () => {
    cy.bcVisit('/')
    cy.get('[aria-label="Sign in"]').eq(0).click()

    cy.get('#login_email').type('jacksongrowson@gmail.com')
    cy.get('#login_pass').type('password1{enter}')

    cy.get('.page-heading').should('contain', 'Orders')
  })
})

// Add to Cart
// Start Checkout (Checkout page load)
describe('Add Product and goto Checkout', () => {
  it('Add Product and Checkout', () => {
    cy.bcVisit('/')
    
    cy.get('[aria-label="Shop All"]').eq(0).click()
    cy.get('.card-title').eq(0).click()

    cy.get('#form-action-addToCart').click()
    // whatever happens after clicking add to cart is inconsistent, so just navigate to cart
    // sometimes a success modal opens but most of the time it navigates to cart
    cy.bcVisit('/cart.php')
    cy.get('.page-heading').should('contain', '1 item')
    cy.get('[href="/checkout"]').click()
    cy.get('.optimizedCheckout-headingPrimary').eq(0).should('contain', 'Customer')
  })
})