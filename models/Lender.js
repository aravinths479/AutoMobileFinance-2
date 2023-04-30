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
  current_bal:{
    type:String,
    required:false,
  },
  paid_record:{
    type:[Number],
    required:false
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
  dueDate:{
    type:String,
    required:false,
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
  isClosed:{
    type:Boolean,
    default:false,
    required:false
  }

});

const Lender = mongoose.model('Lender', LenderSchema);

module.exports = Lender;

