import { LoginPage } from '../pages/LoginPage';

describe('Login Flow Tests', () => {
  const loginPage = new LoginPage();
  const VALID_USER = 'godowow793@soppat.com';
  const VALID_PASSWORD = 'm90%OrtVIQNj';

  beforeEach(() => {
    cy.mockUserDataUnauthorized();
  });

  it('should log in successfully with valid credentials', () => {
    cy.mockSuccessfulSession();

    loginPage.visit();
    cy.closeWelcomeTour();

    cy.mockSuccessfulUserData(VALID_USER);

    loginPage.login(VALID_USER, VALID_PASSWORD);

    cy.wait('@getUserSession');
    cy.wait('@getUserData');
    cy.url().should('include', '/parking/map');
  });

  const invalidCredentials = [
    { description: 'invalid email', user: 'wrong-user@test.com', pass: VALID_PASSWORD },
    { description: 'invalid password', user: VALID_USER, pass: 'WrongPassword123!' },
  ];

  invalidCredentials.forEach((data) => {
    it(`should display error on ${data.description}`, () => {
      cy.mockFailedSession();

      loginPage.visit();
      cy.closeWelcomeTour();
      loginPage.login(data.user, data.pass);

      cy.wait('@badLoginRequest');
      loginPage.verifyErrorMessageIsVisible();
      cy.url().should('include', '/parking/login');
    });
  });

  it('should disable login button when email is empty', () => {
    loginPage.visit();
    cy.closeWelcomeTour();
    loginPage.typePassword(VALID_PASSWORD);
    loginPage.verifyLoginButtonIsDisabled();
  });

  it('should disable login button when password is empty', () => {
    loginPage.visit();
    cy.closeWelcomeTour();
    loginPage.typeEmail(VALID_USER);
    loginPage.verifyLoginButtonIsDisabled();
  });

  it('should disable login button when both fields are empty', () => {
    loginPage.visit();
    cy.closeWelcomeTour();
    loginPage.verifyLoginButtonIsDisabled();
  });
});