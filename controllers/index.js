const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use ('/events', require('./events'));
router.use ('/registration', require('./registration'));
router.use ('/signin', require('./signin'));
router.use ('/schedulequeries', require('./schedulequeries'));
//router.use ('/mockdata', require('./mockdata'));

module.exports = router;
