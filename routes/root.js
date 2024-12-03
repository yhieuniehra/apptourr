const express = require('express');
const router = express.Router();
const homeController = require('../Controllers/home_controller');
const authController = require('../Controllers/auth_controller');

router.get('/', homeController.home);
router.get('/login', authController.login);

module.exports = router;