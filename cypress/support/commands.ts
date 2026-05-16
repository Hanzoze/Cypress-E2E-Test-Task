/// <reference types="cypress" />

const API_USER_DATA = '**/getUserData*';
const API_USER_SESSION = '**/getUserSession*';

Cypress.Commands.add('closeWelcomeTour', () => {
  cy.get('.shepherd-button-primary').click();
  cy.get('body').then(($body) => {
    if ($body.find('.shepherd-button-secondary').length > 0) {
      cy.get('.shepherd-button-secondary').click();
    }
  });
});

Cypress.Commands.add('mockUserDataUnauthorized', () => {
  cy.intercept('GET', API_USER_DATA, {
    statusCode: 401,
    body: { error: 'Unauthorized' },
  }).as('initialUserData');
});

Cypress.Commands.add('mockUserDataNotFound', () => {
  cy.intercept('GET', API_USER_DATA, {
    statusCode: 404,
    body: { message: 'Not Found' },
  }).as('userData');
});

Cypress.Commands.add('mockSuccessfulSession', () => {
  cy.fixture('session').then((session) => {
    cy.intercept('POST', API_USER_SESSION, {
      statusCode: 200,
      body: session,
    }).as('getUserSession');
  });
});

Cypress.Commands.add('mockFailedSession', () => {
  cy.intercept('POST', API_USER_SESSION, {
    statusCode: 401,
    body: { error: 'Unauthorized', message: 'Invalid username or password.' },
  }).as('badLoginRequest');
});

Cypress.Commands.add('mockSuccessfulUserData', (email: string) => {
  cy.fixture('userData').then((userData) => {
    cy.intercept('GET', API_USER_DATA, {
      statusCode: 200,
      body: { ...userData, emailAddress: email },
    }).as('getUserData');
  });
});

// Type declarations
declare global {
  namespace Cypress {
    interface Chainable {
      closeWelcomeTour(): Chainable<void>;
      mockUserDataUnauthorized(): Chainable<void>;
      mockUserDataNotFound(): Chainable<void>;
      mockSuccessfulSession(): Chainable<void>;
      mockFailedSession(): Chainable<void>;
      mockSuccessfulUserData(email: string): Chainable<void>;
    }
  }
}

export {};