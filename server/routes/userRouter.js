const express = require('express');
const authController = require('../controllers/authController');
const squareController = require('../controllers/squareController');
const userController = require('../controllers/userController');
const practitionerController = require('../controllers/practitionerController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', squareController.creatCustomer, authController.signup);
router.post('/logout', authController.logout);
router.get('/get-auth-status', authController.isLoggedIn);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.post('/submit-contact-form', userController.submitContactForm);

router.use(authController.protect, authController.restrictTo('admin'));
router.get('/get-all-users'); // need to build user controller

module.exports = router;
