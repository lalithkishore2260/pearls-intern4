const { Doctor } = require('../models');
const jwt = require('jsonwebtoken');

class AuthService {
  async register(userData) {
    const existing = await Doctor.findOne({ where: { email: userData.email } });
    if (existing) throw { status: 400, message: "Email already registered" };
    
    const doctor = await Doctor.create(userData);
    return this.generateToken(doctor);
  }

  async login(email, password) {
    const doctor = await Doctor.findOne({ where: { email } });
    if (!doctor || !(await doctor.comparePassword(password))) {
      throw { status: 401, message: "Invalid email or password" };
    }
    return this.generateToken(doctor);
  }

  generateToken(user) {
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    return { token, user: { id: user.id, name: user.name, role: user.role } };
  }
}

module.exports = new AuthService();
