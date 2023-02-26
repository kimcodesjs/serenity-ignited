const express = require('express');
const eventController = require('../controllers/eventController');
const router = express.Router();

router.post('/create-event', eventController.createEvent);

router.get('/get-all-events', eventController.getAllEvents);

module.exports = router;
