const express = require('express');
const passport = require('passport');
const router = express.Router();
const con = require('../../databse/db');
const passportSetup = require('../../config/passport-setup');

router.post('/search', (req, res) => {
    var district =req.body.district;

    if(district === "all"){

        var sql = "select * from Tutor";
    
        con.query(sql, function(err, result){
            if (err) throw err;
            else{
                var user = [];
                for(var i=0; i<result.length; i++){
                    user[i] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        location: result[i].Location,
                        mobile: result[i].Mobile,
                        subject: result[i].Subject,
                        rate: result[i].Rate,
                        imgURL: result[i].ImgURL,
                        email: result[i].email
                    }
                }
                res.send({
                    user: user
                });
                //console.log(result);
            }
        });
    }

    else{

        var sql = "select * from Tutor where Location like '%"+district+"%'";
        
        con.query(sql, function(err, result){
            if(err) throw err;
            else{
                var user = [];
                for(var i=0; i<result.length; i++){
                    user[i] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        location: result[i].Location,
                        mobile: result[i].Mobile,
                        subject: result[i].Subject,
                        email: result[i].email,
                        imgURL: result[i].ImgURL,
                        rate: result[i].Rate
                    }
                }
                res.send({
                    user: user
                });
            }
        })
    }
});

module.exports = router;