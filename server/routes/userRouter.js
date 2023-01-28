const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout);
router.get('/get-auth-status', authController.isLoggedIn);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;
