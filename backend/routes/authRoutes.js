const express = require('express');
const authControllers = require('../controllers/authControllers');

const router = express.Router();


router.post('/createAccount', authControllers.createAccount);
router.post('/verifyUser', authControllers.verifyUser);
router.post('/userDetails', authControllers.verifyUser, authControllers.accountDetails);
router.post('/login', authControllers.loginUser);

module.exports = router;