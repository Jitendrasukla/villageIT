import { expect, test } from '@playwright/test';
import { Home } from '@pages/app';

//Fix the below scripts to work consistently and do not use static waits. Add proper assertions to the tests
// Login 3 times sucessfully
test('Login multiple times sucessfully @c1', async ({ page }) => {
  const HomePage = new Home(page);
  await HomePage.goToUrl('/');
  await HomePage.openLink(`//*[@href='/challenge1.html']`);
  // Login multiple times
  for (let i =  1; i <= 3; i++) {
    await expect(page.locator(`#successMessage`)).not.toBeVisible();
    const emailText = `test${i}@example.com`
    const passwordText = `password${i}`
    await HomePage.fillEmail(emailText);
    await HomePage.fillPassword(passwordText);
    await HomePage.login();
    const validationText = ['Successfully submitted!', `Email: ${emailText}`, `Password: ${passwordText}`];
    await HomePage.validateInnerText(`#successMessage`,...validationText)
  }
});

// Login and logout successfully with animated form and delayed loading
test('Login animated form and logout sucessfully @c2', async ({ page }) => {
  const HomePage = new Home(page);
  await HomePage.goToUrl('/');
  await HomePage.openLink(`//*[@href='/challenge2.html']`);
  const emailText = `test1@example.com`
  await HomePage.fillEmail(emailText);
  await HomePage.fillPassword(`password1`);
  await HomePage.login(true);
  const validationText = ["Welcome!", emailText]
  await HomePage.validateInnerText(`#dashboard`, ...validationText)
  await HomePage.openMenu();
  await HomePage.logout();
});

// Fix the Forgot password test and add proper assertions
test('Forgot password @c3', async ({ page }) => {
  const HomePage = new Home(page);
  await HomePage.goToUrl('/');
  await HomePage.openLink(`//*[@href='/challenge3.html']`);
  await HomePage.forgotPassword();
  const emailText = 'test@example.com';
  await HomePage.fillEmail(emailText);
  await HomePage.resetPassword();
  const validationText = ["Success!", "Password reset link sent!", emailText];
  await HomePage.validateInnerText(`#mainContent`, ...validationText)
});

//Fix the login test. Hint: There is a global variable that you can use to check if the app is in ready state
test('Login and logout @c4', async ({ page }) => {
  const HomePage = new Home(page);
  await HomePage.goToUrl('/');
  await HomePage.openLink(`//*[@href='/challenge4.html']`);
  await HomePage.waitForAppReady();
  const emailText = 'test@example.com';
  await HomePage.fillEmail(emailText);
  await HomePage.fillPassword(`password`);
  await HomePage.login();
  await HomePage.validateInnerText(`#profileButton`, ...[emailText]);
  await HomePage.openProfile();
  await HomePage.logout();
});
