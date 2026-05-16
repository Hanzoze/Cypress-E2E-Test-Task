import { LoginPage } from './LoginPage';

export class RegisterPage {
  private loginPage = new LoginPage();
  private emailInput = 'input[formcontrolname="name"]';
  private passwordInput = 'input[formcontrolname="pass"]';
  private passwordRepeatInput = 'input[formcontrolname="passRepeat"]';
  private registerButton = 'button[type="submit"]';
  private checkbox = 'input[type="checkbox"]';
  private registerLink = 'a[href="/parking/register"]';

  visit() {
    this.loginPage.visit();
    this.loginPage.closeWelcomeTour();
    cy.get(this.registerLink).click();
    cy.url().should('include', '/parking/register');
  }

  fillBaseRegistrationForm(password: string) {
    cy.get(this.emailInput).clear().type('new-test-user@soppat.com');
    cy.get(this.passwordInput).clear().type(password);
    cy.get(this.passwordRepeatInput).clear().type(password);
  }

  acceptAgreements() {
    cy.get(this.checkbox).eq(0).check({ force: true });
    cy.get(this.checkbox).eq(1).check({ force: true });
  }

  verifyRegisterButtonIsEnabled() {
    cy.get(this.registerButton).should('be.enabled');
  }

  verifyRegisterButtonIsDisabled() {
    cy.get(this.registerButton).should('be.disabled');
  }
}