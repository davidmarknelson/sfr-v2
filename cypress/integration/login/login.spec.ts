import { aliasQuery } from '../../utils';

describe('Login page', () => {
  before(() => {
    cy.resetDatabase();
    cy.createUser();
    cy.visit('http://localhost:4200/login');
  });

  it('should pass an accessibility check', () => {
    cy.injectAxe();
    cy.get('h1');
    cy.checkA11y();
  });

  describe('Email', () => {
    it('should show an error if the username is empty', () => {
      cy.get('[formcontrolname="email"').clear().blur();
      cy.get('mat-error').should('contain.text', 'This field is requiredEmail');
    });
  });

  describe('Password', () => {
    it('should show an error if the password is empty', () => {
      cy.get('[formcontrolname="password"').clear().blur();
      cy.get('mat-error').should(
        'contain.text',
        'This field is requiredPassword'
      );
    });
  });

  describe('submit', () => {
    it('should successfully submit and route to the profile page', () => {
      cy.get('[formcontrolname="email"').clear().type('email@email.com');
      cy.get('[formcontrolname="password"').clear().type('password!234');
      cy.get('[type="submit"]').click();
      cy.url().should('equal', 'http://localhost:4200/profile');
      cy.get('nav button').should('contain.text', 'Logout');
      cy.clearLocalStorage();
    });

    it('should show an error if you use the wrong email', () => {
      cy.resetDatabase();
      cy.createUser();
      cy.visit('http://localhost:4200/login');
      cy.get('[formcontrolname="email"').clear().type('email@email.coms');
      cy.get('[formcontrolname="password"').clear().type('password!234');
      cy.get('[type="submit"]').click();
      cy.url().should('not.equal', 'http://localhost:4200/profile');
      cy.get('sfr-announcement').should(
        'contain.text',
        'Email or password is incorrect'
      );
    });

    it('should show an error if you use the wrong password', () => {
      cy.intercept('POST', 'http://localhost:3000/graphql', (req) => {
        aliasQuery(req, 'login');
      });
      cy.get('[formcontrolname="email"').clear().type('email@email.com');
      cy.get('[formcontrolname="password"').clear().type('password!2345');
      cy.get('[type="submit"]').click();
      cy.wait('@gqlloginQuery');
      cy.url().should('not.equal', 'http://localhost:4200/profile');
      cy.get('sfr-announcement').should(
        'contain.text',
        'Email or password is incorrect'
      );
    });
  });
});
