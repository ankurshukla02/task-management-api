'use strict';

const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await queryInterface.bulkInsert('users', [
      {
        id: randomUUID(),
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'Admin User 1',
        email: 'admin1@example.com',
        password: hashedPassword,
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'User 1',
        email: 'user1@example.com',
        password: hashedPassword,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        name: 'User 2',
        email: 'user2@example.com',
        password: hashedPassword,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' });
  },
};
