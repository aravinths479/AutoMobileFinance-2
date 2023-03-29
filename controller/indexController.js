const Lender = require("../models/Lender")

exports.getHome = (req, res) =>{

    Lender.find({},(err,lender)=>{
        res.render('home', {
            lender:lender,
            page_name:"home"})
    })

}

