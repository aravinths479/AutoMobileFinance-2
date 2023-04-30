const mongoose = require('mongoose');

const TaxSchema = new mongoose.Schema({
  
  
  taxableIncome : {
    type: String,
    required:true
  },
  businessExpence:{
    type:String,
    required:true
  },
  deductions:{
    type:String,
    required:true
  },
  taxRate:{
    type:String,
    required:true
  }
  
});

const Tax = mongoose.model('Tax', TaxSchema);

module.exports = Tax;
