const express = require('express');
const router = express.Router();
const config  = require('../config')
const cors = require('cors')

const userController = require('../controllers/userController');
//const {checkAuth} = require("../middlewares/auth");

router.post('/login', userController.login);
//router.post('/logout', cors(config.corsOptions), userController.logout);
router.post('/register', userController.create);
router.post('/logout', userController.logout);

module.exports = router;