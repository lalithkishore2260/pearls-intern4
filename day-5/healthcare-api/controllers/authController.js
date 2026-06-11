const { User, DoctorProfile, PatientProfile } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, ...profileData } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = await User.create({ name, email, password: hashedPassword, role });

    if (role === 'doctor') {
      await DoctorProfile.create({ userId: user.id, ...profileData });
    } else {
      await PatientProfile.create({ userId: user.id, ...profileData });
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};