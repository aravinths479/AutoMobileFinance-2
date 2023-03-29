const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require("mongoose")
const MongoClient = require('mongodb').MongoClient;
// Load User model
const User = require('../models/User');

exports.getAccount = (req,res)=>{
  const { companyName, pnum, tin, accno, ifsc ,email,street,city, zip, state } = req.user; 
  res.render('company_details',{
    page_name:"account",
    companyName:companyName , pnum:pnum, tin:tin, accno:accno, ifsc:ifsc , email:email, city:city ,state: state,zip:zip ,street:street }
  )
}

exports.postUpdateAccount = (req,res) =>{
  console.log(req.body);
  const { companyName, pnum, tin, accno, ifsc, city, state, zip, street } = req.body;
  const email = req.user.email;
  var myquery = { email: req.user.email };
  var newvalues = { $set: {companyName:companyName , pnum:pnum, tin:tin , accno:accno , ifsc:ifsc, city:city ,state: state,zip:zip ,street:street }};
  
  User.updateOne(myquery,newvalues,(err,data)=>{
    if(err){
      console.log(data);
    }
    else{
      console.log("company details updated");
      return res.redirect("/users/account")
    }
  })

}

exports.postLogin = (req,res,next) =>{
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
}

exports.postRegister = (req,res,next) => {

    const {  email, password, password2 } = req.body;
  let errors = [];

  if ( !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
     
          email,
          password,
          password2
        });
      } 
      else {
        const newUser = new User({
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                passport.authenticate('local', {
                  successRedirect: '/home',
                  failureRedirect: '/users/login',
                  failureFlash: true
                })(req, res, next);
              })
              .catch(err => console.log(err));
          });
        });
        

      }
    });
  }

}






exports.getLogout = (req,res) => {
    req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
}