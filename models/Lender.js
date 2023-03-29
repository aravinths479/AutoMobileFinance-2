const mongoose = require('mongoose');

const LenderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    default:""
  },
  name:{
    type: String,
    required: true,
    default:""
  },
  vnum:{
    type:String,
    required:true,
    default:""
  },
  pnum: {
    type: String,
    required: false,
    default:""
  },
  aadhar: {
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
  },
  loan_amt: {
    type: Number,
    required: false,
    default:""
  },
  duration: {
    type: Number,
    required: false,
    default:""
  },
  interest: {
    type: String,
    required: false,
    default:""
  },
  pnum: {
    type: String,
    required: false,
    default:""
  },
  check_leaf: {
    type: String,
    required: false,
    default:""
  },

});

const Lender = mongoose.model('Lender', LenderSchema);

module.exports = Lender;

