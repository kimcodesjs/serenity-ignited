const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const squareController = require('../controllers/squareController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post(
  '/create-appointment',
  authController.protect,
  squareController.createPayment,
  appointmentController.createAppointment
);

router.get(
  '/get-my-appointments',
  authController.protect,
  appointmentController.getUserAppointments
);

router.get(
  '/get-all-appointments',
  authController.protect,
  appointmentController.getAllAppointments
);

module.exports = router;
