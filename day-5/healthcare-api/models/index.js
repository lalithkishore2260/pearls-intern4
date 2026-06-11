const sequelize = require('../config/database');
const User = require('./User');
const DoctorProfile = require('./DoctorProfile');
const PatientProfile = require('./PatientProfile');

// Associations
User.hasOne(DoctorProfile, { foreignKey: 'userId', onDelete: 'CASCADE' });
DoctorProfile.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(PatientProfile, { foreignKey: 'userId', onDelete: 'CASCADE' });
PatientProfile.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, DoctorProfile, PatientProfile };