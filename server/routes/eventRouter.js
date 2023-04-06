const express = require('express');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/get-all-events', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);
// Routes are protected with auth and resctricted to Admin Users
router.use(authController.protect, authController.restrictTo('admin'));
router.post('/create-event', eventController.createEvent);

module.exports = router;
