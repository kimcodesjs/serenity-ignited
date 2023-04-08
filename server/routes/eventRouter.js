const express = require('express');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const squareController = require('../controllers/squareController');
const router = express.Router();

router.get('/get-all-events', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);

// Routes are protected with auth
router.use(authController.protect);
router.post(
  '/purchase-ticket',
  squareController.createPayment,
  eventController.purchaseTicket
);

// Routes are protected with auth and resctricted to Admin Users
router.use(authController.restrictTo('admin'));
router.post('/create-event', eventController.createEvent);

module.exports = router;
