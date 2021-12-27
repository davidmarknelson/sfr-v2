import { aliasQuery } from '../../utils';

describe('Signup page', () => {
  before(() => {
    cy.resetDatabase();
    cy.visit('http://localhost:4200/signup');
  });

  it('should pass an accessibility check', () => {
    cy.injectAxe();
    cy.get('h1');
    cy.checkA11y();
  });

  describe('Username', () => {
    it('should show an error if the username is empty', () => {
      cy.get('[formcontrolname="username"').clear().blur();
      cy.get('mat-error').should(
        'contain.text',
        'This field is requiredUsername'
      );
    });

    it('should show an error if the username is too short', () => {
      cy.get('[formcontrolname="username"').clear().type('aaaa').blur();
      cy.get('mat-error').should(
        'contain.text',
        'Username must be at least 5 characters'
      );
    });

    it('should show an error if the username is too long', () => {
      cy.get('[formcontrolname="username"')
        .clear()
        .type('a'.padEnd(26, 'a'))
        .blur();
      cy.get('mat-error').should(
        'contain.text',
        'Username must not be longer than 25 characters '
      );
    });
  });

  describe('Email', () => {
    it('should show an error if the username is empty', () => {
      cy.get('[formcontrolname="email"').clear().blur();
      cy.get('mat-error').should('contain.text', 'This field is requiredEmail');
    });

    it('should show an error if the email is not valid', () => {
      cy.get('[formcontrolname="email"').clear().type('email@@').blur();
      cy.get('mat-error').should('contain.text', 'This must be a valid email');
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

    it('should show an error if the password is too short', () => {
      cy.get('[formcontrolname="password"').clear().type('password!23').blur();
      cy.get('mat-error').should(
        'contain.text',
        'Password must contain a letter, a number, a special character, and be at least 12 characters long'
      );
    });

    it('should show an error if the password has no special characters', () => {
      cy.get('[formcontrolname="password"').clear().type('password1234').blur();
      cy.get('mat-error').should(
        'contain.text',
        'Password must contain a letter, a number, a special character, and be at least 12 characters long'
      );
    });

    it('should show an error if the password has no letters', () => {
      cy.get('[formcontrolname="password"').clear().type('!23412341234').blur();
      cy.get('mat-error').should(
        'contain.text',
        'Password must contain a letter, a number, a special character, and be at least 12 characters long'
      );
    });

    it('should show an error if the password has no numbers', () => {
      cy.get('[formcontrolname="password"').clear().type('password!!!!').blur();
      cy.get('mat-error').should(
        'contain.text',
        'Password must contain a letter, a number, a special character, and be at least 12 characters long'
      );
    });
  });

  describe('Password Confirmation', () => {
    it('should show an error if the password confirmation is empty', () => {
      cy.get('[formcontrolname="passwordConfirmation"').clear().blur();
      cy.get('mat-error').should(
        'contain.text',
        'This field is requiredPassword Confirmation'
      );
    });

    it('should show an error if the password confirmation and password do not match', () => {
      cy.get('[formcontrolname="password"').clear().type('password!234').blur();
      cy.get('[formcontrolname="passwordConfirmation"')
        .clear()
        .type('no match')
        .blur();
      cy.get('mat-error').should('contain.text', 'Passwords must match');
    });
  });

  describe('submit', () => {
    it('should successfully submit and route to the profile page', () => {
      cy.get('[formcontrolname="username"').clear().type('username');
      cy.get('[formcontrolname="email"').clear().type('email@email.com');
      cy.get('[formcontrolname="password"').clear().type('password!234');
      cy.get('[formcontrolname="passwordConfirmation"')
        .clear()
        .type('password!234');
      cy.get('[type="submit"]').click();
      cy.url().should('equal', 'http://localhost:4200/profile');
      cy.get('nav button').should('contain.text', 'Logout');
      cy.clearLocalStorage();
    });

    it('should show an error if you use a duplicate username', () => {
      cy.resetDatabase();
      cy.createUser();
      cy.visit('http://localhost:4200/signup');
      cy.get('[formcontrolname="username"').clear().type('some-user');
      cy.get('[formcontrolname="email"').clear().type('email@email.coms');
      cy.get('[formcontrolname="password"').clear().type('password!234');
      cy.get('[formcontrolname="passwordConfirmation"')
        .clear()
        .type('password!234');
      cy.get('[type="submit"]').click();
      cy.url().should('not.equal', 'http://localhost:4200/profile');
      cy.get('sfr-announcement').should(
        'contain.text',
        'An account with this email or username already exists'
      );
    });

    it('should show an error if you use a duplicate email', () => {
      cy.intercept('POST', 'http://localhost:3000/graphql', (req) => {
        aliasQuery(req, 'signup');
      });
      cy.get('[formcontrolname="username"').clear().type('usernames');
      cy.get('[formcontrolname="email"').clear().type('email@email.com');
      cy.get('[type="submit"]').click();
      cy.wait('@gqlsignupQuery');
      cy.url().should('not.equal', 'http://localhost:4200/profile');
      cy.get('sfr-announcement').should(
        'contain.text',
        'An account with this email or username already exists'
      );
    });
  });
});
