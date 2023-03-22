const express = require('express');
const authController = require('../controllers/authController');
const squareController = require('../controllers/squareController');

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', squareController.creatCustomer, authController.signup);
router.post('/logout', authController.logout);
router.get('/get-auth-status', authController.isLoggedIn);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Routes are restricted to Admin Users
router.use(authController.restrictTo('admin'));
router.get('/get-all-users'); // need to build user controller
module.exports = router;
