// utils/helpers.js
const login = async (page, username, password) => {
	console.log(`Logging in with username: ${username}`);
	await page.fill('input[name="username"]', username);
	await page.fill('input[name="password"]', password);
	await page.click('button[type="submit"]');
	await page.waitForNavigation();
	console.log('Login successful, navigated to dashboard');
};

module.exports = { login };
