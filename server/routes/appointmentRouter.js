const express = require('express');
const appointmentsController = require('../controllers/appointmentsController');
const squareController = require('../controllers/squareController');

const router = express.Router();

router.post(
  '/create-appointment',
  squareController.createPayment,
  appointmentsController.createAppointment
);

module.exports = router;
