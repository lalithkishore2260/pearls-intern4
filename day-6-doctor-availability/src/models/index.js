const sequelize = require('../config/database');
const Doctor = require('./doctor');
const RecurringAvailability = require('./recurringAvailability');
const CustomAvailability = require('./customAvailability');

// Relationships
Doctor.hasMany(RecurringAvailability, { foreignKey: 'doctorId', as: 'recurringSlots' });
RecurringAvailability.belongsTo(Doctor, { foreignKey: 'doctorId' });

Doctor.hasMany(CustomAvailability, { foreignKey: 'doctorId', as: 'customSlots' });
CustomAvailability.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = {
  sequelize,
  Doctor,
  RecurringAvailability,
  CustomAvailability
};
