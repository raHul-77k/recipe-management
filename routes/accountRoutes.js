const express = require('express');
const router = express.Router();

const accountController = require('../controllers/accountControllers');
const authentication = require('../authentication/authentication');

//routes
router.post('/signup',accountController.signup);
router.post('/login', accountController.login);

module.exports = router;