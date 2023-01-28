const express = require('express');
const sessionController = require('../controllers/sessionController');

const router = express.Router();

router.get('/get-all-sessions', sessionController.getAllSessions);
router.post('/new-session', sessionController.createNewSession);

module.exports = router;
