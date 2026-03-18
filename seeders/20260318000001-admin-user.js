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
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' });
  },
};
