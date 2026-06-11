const express = require('express');
const doctorController = require('../controllers/doctorController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

// Publicly list all doctors
router.get('/', doctorController.getAllDoctors);

// Protect all following routes
router.use(protect);

// Only doctors can view/update their own profile
router.get('/profile', restrictTo('doctor'), doctorController.getProfile);
router.patch('/profile', restrictTo('doctor'), doctorController.updateProfile);

module.exports = router;