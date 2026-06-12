const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CustomAvailability = sequelize.define('CustomAvailability', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  doctorId: { 
    type: DataTypes.UUID, 
    allowNull: false 
  },
  date: { 
    type: DataTypes.DATEONLY, 
    allowNull: false 
  },
  startTime: { 
    type: DataTypes.TIME, 
    allowNull: false 
  },
  endTime: { 
    type: DataTypes.TIME, 
    allowNull: false 
  }
});

module.exports = CustomAvailability;
