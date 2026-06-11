const { User, DoctorProfile } = require('../models');

exports.getProfile = async (req, res) => {
  try {
    const doctor = await User.findByPk(req.user.id, {
      include: [{ model: DoctorProfile, as: 'doctorProfile' }]
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ status: 'success', data: doctor });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, specialization, experience, hospital, bio } = req.body;

    const doctorProfile = await DoctorProfile.findOne({ where: { userId: req.user.id } });
    
    if (!doctorProfile) {
      return res.status(404).json({ message: 'Doctor profile not found' });
    }

    if (name) {
      await User.update({ name }, { where: { id: req.user.id } });
    }

    await doctorProfile.update({
      specialization: specialization || doctorProfile.specialization,
      experience: experience || doctorProfile.experience,
      hospital: hospital || doctorProfile.hospital,
      bio: bio || doctorProfile.bio
    });

    const updatedDoctor = await User.findByPk(req.user.id, {
      include: [{ model: DoctorProfile, as: 'doctorProfile' }]
    });

    res.status(200).json({ status: 'success', data: updatedDoctor });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await User.findAll({
      where: { role: 'doctor' },
      include: [{ model: DoctorProfile, as: 'doctorProfile' }]
    });
    res.status(200).json({ status: 'success', results: doctors.length, data: doctors });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
