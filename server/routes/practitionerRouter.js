const express = require('express');
const authController = require('../controllers/authController');
const practitionerController = require('../controllers/practitionerController');

const router = express.Router();

router.get('/:id', practitionerController.getPractitionerData);

// Routes are protected and restricted to Admin Users
router.use(authController.protect, authController.restrictTo('admin'));

router.post('/:id', practitionerController.postPractitionerData);
router.patch('/:id', practitionerController.updatePractitionerData);

module.exports = router;
