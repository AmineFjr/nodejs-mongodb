const express = require('express');
const router = express.Router();
const config  = require('../config')
const cors = require('cors')

const userController = require('../controllers/userController');
//const {checkAuth} = require("../middlewares/auth");

router.post('/login', cors(config.corsOptions), userController.login);
router.post('/register', cors(config.corsOptions), userController.create);
router.post('/logout', cors(config.corsOptions), userController.logout);

module.exports = router;