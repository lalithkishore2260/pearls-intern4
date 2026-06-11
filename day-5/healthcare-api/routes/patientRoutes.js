const express = require('express');
const patientController = require('../controllers/patientController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

// Only patients can view/update their own profile
router.get('/profile', restrictTo('patient'), patientController.getProfile);
router.patch('/profile', restrictTo('patient'), patientController.updateProfile);

module.exports = router;
