const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.get('/viewProfile', (req, res) => {
    var email = req.body.email;
    var sql = "select FirstName, LastName, Location, Mobile, Subject, Rate, ImgURL from Tutor where email='"+email+"'";

    con.query(sql, (err, result) => {
        if(err) {
            res.json({
                profile: null
            }) ;        
        }
        else{
            var profile = {
               email: email,
               FirstName: result[0].FirstName,
               LastName: result[0].LastName,
               Location: result[0].Location,
               Mobile: result[0].Mobile,
               Subject: result[0].Subject,
               Rate: result[0].Rate,
               ImgUrl: result[0].ImgURL
           }
           
            res.json({
                profile: profile
            });
           
        }
    })   
    
});

router.put('/editProfile', (req, res) => {
    var role = req.body.role;
    var email = req.body.email;
    console.log(req);

    if (role === 'tutor') {
        var fname = req.body.fname;
        var lname = req.body.lname;
        var mobile = req.body.mobile;
        var subject = req.body.subject;
        var location = req.body.location;
        var rate = req.body.rate;
        var imgUrl = req.body.imgUrl;

        var sql = "update Tutor set FirstName='" + fname + "', LastName='" + lname + "', Mobile='" + mobile + "', Subject='" + subject + "', Location='" + location + "', Rate='" + rate + "', ImgURL='" + imgUrl + "' where email='" + email + "'";

        con.query(sql, function (err, result) {
            if (err) {
                res.status(404).send({
                    success: false
                });
            }
            else {
                //console.log(result);
                res.send({
                    success: true
                });
            }
        });

    }

    if (role === 'student') {
        var name = req.body.name;
        var mobile = req.body.mobile;
        var location = req.body.location;

        var sql = "update Student set name='" + name + "', mobile='" + mobile + "', location='" + location + "' where email='" + email + "'";

        con.query(sql, function (err, result) {
            if (err) {
                res.status(404).send({
                    success: false
                });
            }
            else {
                //console.log(result);
                res.send({
                    success: true
                });
            }
        });
    }
});

module.exports = router;