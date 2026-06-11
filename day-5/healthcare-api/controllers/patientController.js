const { User, PatientProfile } = require('../models');

exports.getProfile = async (req, res) => {
  try {
    const patient = await User.findByPk(req.user.id, {
      include: [{ model: PatientProfile, as: 'patientProfile' }]
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ status: 'success', data: patient });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, age, gender, medicalHistory, bloodGroup } = req.body;

    const patientProfile = await PatientProfile.findOne({ where: { userId: req.user.id } });

    if (!patientProfile) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    if (name) {
      await User.update({ name }, { where: { id: req.user.id } });
    }

    await patientProfile.update({
      age: age || patientProfile.age,
      gender: gender || patientProfile.gender,
      medicalHistory: medicalHistory || patientProfile.medicalHistory,
      bloodGroup: bloodGroup || patientProfile.bloodGroup
    });

    const updatedPatient = await User.findByPk(req.user.id, {
      include: [{ model: PatientProfile, as: 'patientProfile' }]
    });

    res.status(200).json({ status: 'success', data: updatedPatient });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
