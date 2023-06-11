const express = require('express');
const authController = require('../controllers/authController');
const squareController = require('../controllers/squareController');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', squareController.creatCustomer, authController.signup);
router.post('/logout', authController.logout);
router.get('/get-auth-status', authController.isLoggedIn);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Routes are protected and restricted to Admin Users
router.use(authController.protect, authController.restrictTo('admin'));
router.get('/get-all-users'); // need to build user controller
router.get('/practitioner-data', userController.getPractitionerData);

module.exports = router;
