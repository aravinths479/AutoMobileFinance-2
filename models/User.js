const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: false,
    default:""
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true
  },
  pnum: {
    type: String,
    required: false,
    default:""
  },
  tin: {
    type: String,
    required: false,
    default:""
  },
  accno: {
    type: String,
    required: false,
    default:""
  },
  ifsc: {
    type: String,
    required: false,
    default:""
  },
  street : {
    type: String,
    default:""
  },
  city : {
    type: String,
    default:""
  },
  state : {
    type: String,
    default:""
  },
  zip : {
    type: String,
    default:""
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
