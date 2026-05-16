# Allianz Parken E2E Test Suite

Automated end-to-end tests for the Allianz Parken login and registration flows, built with Cypress and TypeScript.

## Overview

This suite covers the following test scenarios:

- **Login flow** — successful login, invalid credentials, empty field validation
- **Registration flow** — password strength validation (length, character classes, special characters)

All network interactions are fully mocked via `cy.intercept()`, so tests run independently of backend availability and produce deterministic results.

## Project Structure

```
cypress/
├── e2e/
│   ├── login.cy.ts             # Authorization & empty field specs
│   └── register.cy.ts          # Password validation specs
├── fixtures/
│   ├── session.json            # Mocked session response
│   └── userData.json           # Mocked user data response
├── pages/
│   ├── LoginPage.ts            # Page Object for /parking/login
│   └── RegisterPage.ts         # Page Object for /parking/register
└── support/
    ├── commands.ts             # Custom Cypress commands
    └── e2e.ts                  # Support entry point
.github/
└── workflows/
    └── ci.yml                  # GitHub Actions CI workflow
cypress.config.ts
package.json
tsconfig.json
```

## Design Patterns & Approach

- **Page Object Model (POM)** — UI selectors and interaction methods are encapsulated in `LoginPage` and `RegisterPage` classes, keeping test files clean and easy to maintain.
- **Custom Commands** — reusable commands like `cy.closeWelcomeTour()`, `cy.mockSuccessfulSession()`, and `cy.mockSuccessfulUserData()` reduce duplication and make test intent immediately readable.
- **Fixtures** — mock responses are stored in `cypress/fixtures/` and loaded via `cy.fixture()`, keeping test files free of hardcoded JSON payloads.
- **Network Interception (`cy.intercept()`)** — all external API calls are mocked, making the suite independent of backend state.
- **Robust Selectors** — elements are located via stable Angular attributes (`formcontrolname`) and semantic HTML types. Dynamic, auto-generated IDs and `cy.contains()` text checks are intentionally avoided to prevent localization-related brittleness.
- **Data-Driven Testing** — password strength rules are validated via bounded arrays, minimising redundant test scripts while efficiently covering edge cases.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

## Installation

```bash
npm install
```

## Running the Tests

### Interactive mode (Cypress UI)

```bash
npm run cy:open
```

### Headless mode — specific browser

```bash
npm run test:chrome
npm run test:firefox
npm run test:edge
```

### Headless mode — all browsers sequentially

```bash
npm run test:all
```

### Run a specific spec

```bash
npx cypress run --spec "cypress/e2e/login.cy.ts"
npx cypress run --spec "cypress/e2e/register.cy.ts"
```

## Test Cases

### Login (`login.cy.ts`)

| # | Scenario | Expected result |
|---|---|---|
| 1 | Valid credentials | Redirected to `/parking/map` |
| 2 | Invalid email | Error toast visible, stays on `/parking/login` |
| 3 | Invalid password | Error toast visible, stays on `/parking/login` |
| 4 | Email empty | Login button disabled |
| 5 | Password empty | Login button disabled |
| 6 | Both fields empty | Login button disabled |

### Registration — Password Strength (`register.cy.ts`)

| # | Scenario | Expected result |
|---|---|---|
| 1 | Password < 8 characters | Register button disabled |
| 2 | No lowercase letter | Register button disabled |
| 3 | No uppercase letter | Register button disabled |
| 4 | No digit | Register button disabled |
| 5 | No special character | Register button disabled |
| 6 | Min valid password (8 chars) | Register button enabled |
| 7 | Long secure password | Register button enabled |

## CI/CD

Tests run automatically on every push and pull request to `main`/`master` via GitHub Actions, across Chrome, Firefox, and Edge in parallel. Screenshots are uploaded as artifacts on failure.

## Target Application

[https://demo.allianz-parken.de](https://demo.allianz-parken.de)