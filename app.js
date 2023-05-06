const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
var morgan = require('morgan')
const bodyParser = require('body-parser')

const app = express();

require("dotenv").config()

// Passport Config
require('./config/passport')(passport);


// Connect to MongoDB
const mongodb =()=>{
  mongoose
  .connect(
   process.env.MONGO_URL,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected ✅'))
  .catch((err)=>{
    console.log("Error connecting DB. Attempting to Reconnect ...");
    setTimeout(()=>{
      mongodb()
    },15000)
  });
}
mongodb();


app.use(morgan('dev'))

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }))

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
require("./config/googleAuth")


app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/home',
    failureRedirect: '/users/login'
  })
);

const { ensureAuthenticated } = require("./config/auth")

const Lender = require("./models/Lender") 
const Tax = require("./models/Tax")

app.get("/edit-lender/:id",ensureAuthenticated,(req,res)=>{
  const _id = req.params.id;
  Lender.find({_id})
    .then((data)=>{
    
      return res.render("editLender",{data:data[0] , user:req.user });
    })
    .catch((err)=>{
      console.log(err);
    })
  
})


app.post("/edit-lender/:id",ensureAuthenticated,(req,res)=>{
  
  const _id = req.params.id;
  console.log(req.body);
  const newVal = req.body; 
  const {name,vnum,pnum,aadhar,street,city,state,zip,loan_amt,duration,interest,current_bal,check_leaf,paid_record} = req.body;
  Lender.updateOne({_id:_id},{$set:req.body},(err,data)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(data);
      res.redirect("/home")
    }
  })
    
})


app.get("/messaging",ensureAuthenticated,(req,res)=>{
  Lender.find({})
    .then((data)=>{
      return res.render("messaging",{data:data, user:req.user})
    })
    .catch((err)=>{
      console.log(err);
      return res.redirect("/home")
    })
  
})

app.get("/message/:id",ensureAuthenticated,(req,res)=>{
  const _id = req.params.id;
  Lender.find({_id:_id})
      .then((data)=>{
        console.log(data);
        const interest = ( parseInt(data[0].loan_amt) * parseInt(data[0].duration) * parseInt(data[0].interest) )/100;
        const totalAmount = parseInt(data[0].loan_amt)+parseInt(interest)
        const due = totalAmount / data[0].duration
        console.log(due);
        return res.render("send-message",{data:data[0],user:req.user,due:due})
      })
      .catch((err)=>{
        console.log(err);
      })
})

const sendMessage = (body,pnum) =>{
  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN_TWILIO;
  const client = require("twilio")(accountSid, authToken);
  try{
    client.messages
    .create({ body: body, from: "+16073502781", to: `+91${pnum}` })
      .then((message) =>{
        console.log(message.sid);
        
      } );
  }
  catch(err){
    console.error(`Error sending SMS: ${err}`);
  }
      
}

app.post("/send-message/:pnum",ensureAuthenticated,async (req,res)=>{
  const pnum = req.params.pnum 
  sendMessage(req.body.msg,pnum);
  res.redirect("/messaging")
})

app.get("/tax-estimation",ensureAuthenticated,(req,res)=>{
  return res.render("tax-estimation",{user:req.user})
})

app.post("/tax-estimation",ensureAuthenticated,(req,res)=>{
  console.log(req.body);
  const {income,expenses,deductions,rate,financialYear} = req.body
  Tax.create({taxableIncome:income,businessExpence:expenses,deductions:deductions,taxRate:rate,financialYear:financialYear})
    .then((data)=>{
      console.log(data);
      res.redirect("/home")
    })
    .catch((err)=>{
      console.log(err);
      return res.redirect("/home")
    })
})

app.get("/close-balance/:id",ensureAuthenticated,(req,res)=>{
  const _id = req.params.id;
  Lender.updateOne({_id},{$set:{isClosed:true}})
    .then((data)=>{
      console.log(data);
      res.redirect("/home")
    })
    .catch((err)=>{
      console.log(err);
      res.redirect("/home")
    })
})

app.get("/closed-balances",ensureAuthenticated,(req,res)=>{
  Lender.find({},(err,lender)=>{
    res.render('closedBalances', {
        lender:lender,
        user:req.user,
        page_name:"home"})
 })
})




app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/lender', require('./routes/lender'))

app.use(function(req, res, next) {
  res.status(404);
  res.render('404-page', {
    title: 'Page Not Found'
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));
