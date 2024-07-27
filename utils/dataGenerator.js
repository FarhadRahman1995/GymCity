// utils/dataGenerator.js
const { faker } = require('@faker-js/faker');
const fs = require('fs');

const generateTestData = () => {
	const users = [];

	for (let i = 0; i < 10; i++) {
		users.push({
			username: faker.internet.userName(),
			password: faker.internet.password(),
			email: faker.internet.email(),
		});
	}

	fs.writeFileSync('./test-data/users.json', JSON.stringify(users, null, 2));
};

generateTestData();
