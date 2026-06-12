const express = require('express');
const router = express.Router();
const controller = require('../controllers/availability.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

// Doctor Management Routes
router.post('/recurring', auth, role('DOCTOR'), controller.createRecurring);
router.post('/custom', auth, role('DOCTOR'), controller.createCustom);
router.delete('/recurring/:id', auth, role('DOCTOR'), controller.deleteRecurring);

// General Retrieval Route (accessible by both)
router.get('/view', auth, controller.getByDate);

module.exports = router;
