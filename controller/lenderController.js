const Lender = require("../models/Lender")

exports.getAddLender = (req,res)=>{
    res.render('addLender', {user:req.user})
  }

exports.postAddLender = (req,res)=>{
  console.log(req.body);
  const {name,vnum,pnum,aadhar,street,city,state,zip,loan_amt,duration,interest,check_leaf} = req.body;
  const email = req.user.email;
  Lender.create({email:email,name:name , pnum:pnum,  city:city ,state: state,zip:zip ,
    street:street,vnum:vnum, aadhar:aadhar,loan_amt:loan_amt,duration:duration,
    interest:interest,check_leaf:check_leaf },(err,data)=>{
      if(err){
        console.log(err);
      }
      if(data){
        console.log("New Lender Added");
        
        res.redirect("/home")
      }
    })
}





// exports.postAddLender = (req,res)=>{
  
//   const {name,vnum,pnum,aadhar,street,city,state,zip,loan_amt,duration,interest,check_leaf} = req.body;
//   const email = req.user.email;
//   var myquery = { email: email };
//   var newvalues = { $set: {name:name , pnum:pnum,  city:city ,state: state,zip:zip ,
//     street:street,vnum:vnum, aadhar:aadhar,loan_amt:loan_amt,duration:duration,
//     interest:interest,check_leaf:check_leaf }};
  
//     // add lender seperate function
//     // update lender separate function

  
//   Lender.findOneAndUpdate(myquery,newvalues, {upsert: true},(err,res)=>{
//     if(err){
//       console.log(err);
//     }
//     if(res){
//       console.log("Lender details updated");
//     }
//   })

//   res.render('addLender')
// }