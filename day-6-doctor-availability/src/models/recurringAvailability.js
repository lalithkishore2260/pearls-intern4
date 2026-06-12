const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RecurringAvailability = sequelize.define('RecurringAvailability', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  doctorId: { 
    type: DataTypes.UUID, 
    allowNull: false 
  },
  dayOfWeek: { 
    type: DataTypes.ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'),
    allowNull: false 
  },
  startTime: { 
    type: DataTypes.TIME, 
    allowNull: false,
    comment: "Format HH:mm"
  },
  endTime: { 
    type: DataTypes.TIME, 
    allowNull: false,
    comment: "Format HH:mm"
  }
});

module.exports = RecurringAvailability;
