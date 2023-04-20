const express = require('express');
const router = express.Router();

const userController = require("../controller/userController")


const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');



// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', userController.postRegister);

// Login
router.post('/login', userController.postLogin);

// Logout
router.get('/logout', userController.getLogout);

//account
router.get('/account',ensureAuthenticated,userController.getAccount)
router.get('/update_account', ensureAuthenticated,userController.getEditAccount)

router.post('/update_account',userController.postUpdateAccount)
module.exports = router;
