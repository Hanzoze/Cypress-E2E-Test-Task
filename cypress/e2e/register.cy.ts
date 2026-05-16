import { RegisterPage } from '../pages/RegisterPage';

describe('Registration Form - Password Strength Validation', () => {
  const registerPage = new RegisterPage();

  const weakPasswords = [
    { rule: 'too short (< 8 chars)', value: 'Ab1!' },
    { rule: 'missing lowercase', value: 'PASWORD123!' },
    { rule: 'missing uppercase', value: 'pasword123!' },
    { rule: 'missing digits', value: 'PaswordLetters!' },
    { rule: 'missing special characters', value: 'Pasword12345' },
  ];

  const strongPasswords = [
    { rule: 'min valid length (8 chars)', value: 'aB1!aB1!' },
    { rule: 'long secure password', value: 'SuperSecurePassword123!WithEverythingInsideIt' },
  ];

  beforeEach(() => {
    cy.mockUserDataNotFound();
  });

  weakPasswords.forEach((passwordData) => {
    it(`should disable register button when password is ${passwordData.rule}`, () => {
      registerPage.visit();
      registerPage.fillBaseRegistrationForm(passwordData.value);
      registerPage.acceptAgreements();
      registerPage.verifyRegisterButtonIsDisabled();
    });
  });

  strongPasswords.forEach((passwordData) => {
    it(`should enable register button when password has ${passwordData.rule}`, () => {
      registerPage.visit();
      registerPage.fillBaseRegistrationForm(passwordData.value);
      registerPage.acceptAgreements();
      registerPage.verifyRegisterButtonIsEnabled();
    });
  });

  it('should register successfully with valid data', () => {
    cy.intercept('POST', '**/register*', {
      statusCode: 200,
      body: { result: 'OK' },
    }).as('registerRequest');

    registerPage.visit();
    registerPage.fillBaseRegistrationForm('ValidPass1!');
    registerPage.acceptAgreements();
    registerPage.verifyRegisterButtonIsEnabled();
  });
});