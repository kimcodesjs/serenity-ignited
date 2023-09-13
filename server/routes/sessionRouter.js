const express = require('express');
const sessionController = require('../controllers/sessionController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/get-all-sessions', sessionController.getAllSessions);

// Routes are protected with auth and restricted to Admin users
router.use(authController.protect, authController.restrictTo('admin'));
router.post('/new-session', sessionController.createNewSession);

module.exports = router;
