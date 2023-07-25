const express = require('express');
const router = express.Router();
const config  = require('../config')
const cors = require('cors')

const userController = require('../controllers/userController');
const {checkAuth} = require("../middlewares/auth");


router.post('/login', cors(config.corsOptions), userController.login);
router.post('/logout', cors(config.corsOptions), checkAuth, userController.logout);
router.post('/register', cors(config.corsOptions), checkAuth, userController.logout);

module.exports = router;