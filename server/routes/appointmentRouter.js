const express = require('express');
const appointmentsController = require('../controllers/appointmentsController');
const squareController = require('../controllers/squareController');
const authController = require('../controllers/authController');
const router = express.Router();

router.post(
  '/create-appointment',
  authController.protect,
  squareController.createPayment,
  appointmentsController.createAppointment
);

router.get(
  '/get-my-appointments',
  authController.protect,
  appointmentsController.getUserAppointments
);

module.exports = router;
