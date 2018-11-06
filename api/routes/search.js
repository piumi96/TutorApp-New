const express = require('express');
const passport = require('passport');
const router = express.Router();
const con = require('../../databse/db');
const passportSetup = require('../../config/passport-setup');

router.get('/search', (req, res) => {
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
                    email: result[i].email,
                    role: result[i].role
                }
            }
            res.send(user);
        }
    });
});

router.get('/searchbydistrict', (req, res) => {
    var district = req.body.district;
    //var district = 'gampaha';
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
                    role: result[i].role
                }
            }
            res.send({
                user: user
            });
        }
    })
});

module.exports = router;