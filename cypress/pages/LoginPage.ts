export class LoginPage {
  private emailInput = 'input[formcontrolname="name"]';
  private passwordInput = 'input[formcontrolname="pass"]';
  private loginButton = 'button[type="submit"]';
  private tourPrimaryButton = '.shepherd-button-primary';
  private tourSecondaryButton = '.shepherd-button-secondary';

  visit() {
    cy.visit('/parking/login');
  }

  closeWelcomeTour() {
    cy.get(this.tourPrimaryButton).click();
    cy.get('body').then(($body) => {
      if ($body.find(this.tourSecondaryButton).length > 0) {
        cy.get(this.tourSecondaryButton).click();
      }
    });
  }

  typeEmail(email: string) {
    cy.get(this.emailInput).clear().type(email);
  }

  typePassword(password: string) {
    cy.get(this.passwordInput).clear().type(password);
  }

  clickSubmit() {
    cy.get(this.loginButton).click();
  }

  login(email: string, password: string) {
    this.typeEmail(email);
    this.typePassword(password);
    this.clickSubmit();
  }

  verifyLoginButtonIsDisabled() {
    cy.get(this.loginButton).should('be.disabled');
  }

  verifyErrorMessageIsVisible() {
    cy.get('#toast-container > .ng-trigger').should('be.visible');
  }
}