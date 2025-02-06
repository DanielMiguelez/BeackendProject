'use strict';

const bcrypt = require('bcryptjs');  // Asegúrate de haber instalado bcrypt

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Marta Gómez',
        email: 'marta.gomez@example.com',
        password: await bcrypt.hash('marta123', 10),  // Encriptamos la contraseña
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Pedro Sánchez',
        email: 'pedro.sanchez@example.com',
        password: await bcrypt.hash('pedro321', 10),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Laura Martín',
        email: 'laura.martin@example.com',
        password: await bcrypt.hash('laura789', 10),
        role: 'moderator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sergio Pérez',
        email: 'sergio.perez@example.com',
        password: await bcrypt.hash('sergio456', 10),
        role: 'editor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Elena Ruiz',
        email: 'elena.ruiz@example.com',
        password: await bcrypt.hash('elena654', 10),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
