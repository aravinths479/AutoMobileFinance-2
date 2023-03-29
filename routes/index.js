const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const indexController = require("../controller/indexController")

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('login'));

// Dashboard
router
      .get('/home', ensureAuthenticated,indexController.getHome);

module.exports = router;
