const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PatientProfile = sequelize.define('PatientProfile', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  age: { type: DataTypes.INTEGER },
  gender: { type: DataTypes.STRING },
  medicalHistory: { type: DataTypes.TEXT }
});

module.exports = PatientProfile;