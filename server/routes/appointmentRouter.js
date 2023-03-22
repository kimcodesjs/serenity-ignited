const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const squareController = require('../controllers/squareController');
const authController = require('../controllers/authController');
const router = express.Router();

// Routes are protected with auth
router.use(authController.protect);

router.post(
  '/create-appointment',
  squareController.createPayment,
  appointmentController.createAppointment
);
router.get('/get-my-appointments', appointmentController.getUserAppointments);

// Routes are protected with auth and restricted to Admin Users
router.use(authController.restrictTo('admin'));

router.get('/get-all-appointments', appointmentController.getAllAppointments);

module.exports = router;
