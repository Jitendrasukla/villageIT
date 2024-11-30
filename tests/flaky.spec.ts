import { expect, test } from '@playwright/test';

// Login 3 times successfully
test('Login multiple times successfully @c1', async ({ page }) => {
  await page.goto('/');
  await page.locator('//*[@href="/challenge1.html"]').click();

  // Login multiple times
  for (let i = 1; i <= 3; i++) {
    await page.locator('#email').fill(`test${i}@example.com`);
    await page.locator('#password').fill(`password${i}`);
    await page.locator('#submitButton').click();

    // Assert success message and its content
    const successMessage = page.locator('#successMessage');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('Successfully submitted!');
    await expect(successMessage).toContainText(`Email: test${i}@example.com`);
    await expect(successMessage).toContainText(`Password: password${i}`);
  }
});

// Login and logout successfully with animated form and delayed loading
test('Login animated form and logout successfully @c2', async ({ page }) => {
  await page.goto('/');
  await page.locator('//*[@href="/challenge2.html"]').click();

  // Wait for form to load
  const emailInput = page.locator('#email');
  await expect(emailInput).toBeVisible();

  // Perform login
  await emailInput.fill('test1@example.com');
  await page.locator('#password').fill('password1');
  await page.locator('#submitButton').click();

  // Assert login success message
  const successMessage = page.locator('#successMessage');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText('Login successful!');

  // Perform logout
  await page.locator('#menuButton').click();
  await page.locator('#logoutOption').click();

  // Assert logout redirects to login form
  await expect(page.locator('#loginForm')).toBeVisible();
});

// Forgot password test with proper assertions
test('Forgot password @c3', async ({ page }) => {
  await page.goto('/');
  await page.locator('//*[@href="/challenge3.html"]').click();

  // Trigger forgot password flow
  await page.getByRole('button', { name: 'Forgot Password?' }).click();
  const emailInput = page.locator('#email');
  await expect(emailInput).toBeVisible();
  await emailInput.fill('test@example.com');
  await page.getByRole('button', { name: 'Reset Password' }).click();

  // Assert success message
  const successHeading = page.getByRole('heading', { name: 'Success!' });
  await expect(successHeading).toBeVisible();
  await expect(page.locator('#mainContent')).toContainText('Password reset link sent!');
});

// Login and logout test with app-ready state check
test('Login and logout @c4', async ({ page }) => {
  await page.goto('/');

  // Wait for app-ready state
  //await page.waitForFunction(() => window.appReady === true);

  await page.locator('//*[@href="/challenge4.html"]').click();

  // Perform login
  await page.locator('#email').fill('test@example.com');
  await page.locator('#password').fill('password');
  await page.locator('#submitButton').click();

  // Assert profile button visibility
  const profileButton = page.locator('#profileButton');
  await expect(profileButton).toBeVisible();

  // Perform logout
  await profileButton.click();
  await page.getByText('Logout').click();

  // Assert logout redirects to login form
  await expect(page.locator('#loginForm')).toBeVisible();
});
