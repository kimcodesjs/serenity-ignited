const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const squareController = require('../controllers/squareController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/', appointmentController.getAllAppointments);

// Routes are protected with auth
router.use(authController.protect);

router.post(
  '/create-appointment',
  appointmentController.createAppointment,
  squareController.createPayment
);
router.get('/get-my-appointments', appointmentController.getUserAppointments);
router.patch('/:id', appointmentController.updateAppointment);
router.delete('/:id', appointmentController.deleteAppointment);

// Routes are protected with auth and restricted to Admin Users
router.use(authController.restrictTo('admin'));

router.get('/get-all-admin', appointmentController.getAllAdmin);

module.exports = router;
