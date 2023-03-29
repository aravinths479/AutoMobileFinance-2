const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User'); // User model schema

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALL_BACK_URL = process.env.CALL_BACK_URL;

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: CALL_BACK_URL,
  passReqToCallback: true,
},
async function(request, accessToken, refreshToken, profile, done) {
  const userExists = await User.findOne({ email: profile.emails[0].value });
    if (userExists) {
      // If user exists, return user object
      return done(null, userExists);
    }
    // If user does not exist, create new user object
    const newUser = new User({
      
      email: profile.emails[0].value,
      password:"asdfghjkl"
    });
    // Save new user object to database
    await newUser.save();
    // Return new user object
    return done(null, newUser);
  
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});