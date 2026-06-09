'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Doctors', [
      {
        fullName: 'Dr Rahul Sharma',
        specialization: 'Cardiologist',
        experience: 10,
        consultationFee: 800,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Dr Priya Menon',
        specialization: 'Dermatologist',
        experience: 8,
        consultationFee: 600,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Dr Arjun Kumar',
        specialization: 'Neurologist',
        experience: 12,
        consultationFee: 1000,
        availability: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Dr Kavya Singh',
        specialization: 'Cardiologist',
        experience: 6,
        consultationFee: 700,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Doctors', null, {});
  }
};