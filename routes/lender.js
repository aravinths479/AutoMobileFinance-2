const express = require('express');
const router = express.Router();
const lenderController = require("../controller/lenderController")
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');



router
    .get('/add-lender',ensureAuthenticated, lenderController.getAddLender)
    .post('/add-lender',ensureAuthenticated, lenderController.postAddLender)


module.exports = router;
