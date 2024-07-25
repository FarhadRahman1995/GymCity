// tests/e2e/login.test.js
const { test, expect } = require('@playwright/test');
const { login } = require('../../utils/helpers');
const users = require('../../test-data/users.json');

test('Login with valid credentials', async ({ page }) => {
	await page.goto('/login');
	await login(page, '01638128628', '123456');
	expect(page.url()).toContain('/dashboard');
});

test('Login with invalid credentials', async ({ page }) => {
	await page.goto('/login');
	await login(page, '01211212121', 'asdf1122');
	const errorMessage = await page.locator('.error-message').innerText();
	expect(errorMessage).toBe(
		'The provided credentials do not match our records.'
	);
});

test('Login with empty username', async ({ page }) => {
	await page.goto('/login');
	await login(page, '', '123456');
	const errorMessage = await page.locator('.error-message').innerText();
	expect(errorMessage).toBe('Phone Number/Email is required');
});

test('Login with empty password', async ({ page }) => {
	await page.goto('/login');
	await login(page, '01638128628', '');
	const errorMessage = await page.locator('.error-message').innerText();
	expect(errorMessage).toBe('Password is required');
});

test('Login with both fields empty', async ({ page }) => {
	await page.goto('/login');
	await login(page, '', '');
	const errorMessage = await page.locator('.error-message').innerText();
	expect(errorMessage).toBe('Phone Number/Email and Password are required');
});

test('Login with special characters in username/password', async ({ page }) => {
	await page.goto('/login');
	await login(page, '!@#$%^&*()', '!@#$%^&*()');
	const errorMessage = await page.locator('.error-message').innerText();
	expect(errorMessage).toBe(
		'The identity field must be valid email or phone number.'
	);
});
