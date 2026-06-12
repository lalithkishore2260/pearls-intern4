const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Doctor = sequelize.define('Doctor', {
  id: { 
    type: DataTypes.UUID, 
    defaultValue: DataTypes.UUIDV4, 
    primaryKey: true 
  },
  name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    unique: true, 
    allowNull: false, 
    validate: { isEmail: true } 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  role: { 
    type: DataTypes.ENUM('DOCTOR', 'PATIENT'), 
    defaultValue: 'DOCTOR' 
  }
}, {
  hooks: {
    beforeCreate: async (doctor) => {
      if (doctor.password) {
        doctor.password = await bcrypt.hash(doctor.password, 10);
      }
    }
  }
});

Doctor.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = Doctor;
