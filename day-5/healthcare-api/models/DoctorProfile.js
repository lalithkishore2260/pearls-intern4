const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DoctorProfile = sequelize.define('DoctorProfile', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  specialization: { type: DataTypes.STRING },
  experience: { type: DataTypes.INTEGER },
  hospital: { type: DataTypes.STRING }
});

module.exports = DoctorProfile;