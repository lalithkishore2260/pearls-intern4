const AvailabilityService = require('../services/availability.service');

exports.createRecurring = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const slot = await AvailabilityService.createRecurring(doctorId, req.body);
    res.status(201).json({ success: true, data: slot });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

exports.createCustom = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const slot = await AvailabilityService.createCustom(doctorId, req.body);
    res.status(201).json({ success: true, data: slot });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

exports.getByDate = async (req, res) => {
  try {
    const { date, doctorId } = req.query;
    // If a doctor is checking their own, use req.user.id, else use query param (for patients)
    const targetDoctorId = doctorId || req.user.id;
    
    if (!date) return res.status(400).json({ success: false, message: "Date query parameter is required" });

    const availability = await AvailabilityService.getAvailabilityByDate(targetDoctorId, date);
    res.status(200).json({ success: true, date, data: availability });
  } catch (error) {
    res.status(error.status || 500).json({ success: false, message: error.message });
  }
};

exports.deleteRecurring = async (req, res) => {
  try {
    await AvailabilityService.deleteRecurring(req.user.id, req.params.id);
    res.status(200).json({ success: true, message: "Slot deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
