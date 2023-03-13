const express = require('express');
const eventController = require('../controllers/eventController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/get-all-events', eventController.getAllEvents);

// Restrict the following routes to Administrators
router.use(authController.protect);
router.use(authController.restrictTo('admin'));
router.post('/create-event', eventController.createEvent);

module.exports = router;
