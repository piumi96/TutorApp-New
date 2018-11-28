const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.get('/viewProfile', (req, res) => {
    var email = req.body.email;
    var role = req.body.role;

    if(role=='tutor'){
        var sql = "select FirstName, LastName, Location, Mobile, Subject, Rate, ImgURL from Tutor where email='"+email+"'";
        var sql1 = "select * from Review where tutor='"+email+"'";
        var profile;
        var reviews = [];
    
        con.query(sql, (err, result) => {
            if(err) {
                res.json({
                    profile: null,
                    reviews: null
                }) ;        
            }
            else{
                profile = {
                   email: email,
                   FirstName: result[0].FirstName,
                   LastName: result[0].LastName,
                   Location: result[0].Location,
                   Mobile: result[0].Mobile,
                   Subject: result[0].Subject,
                   Rate: result[0].Rate,
                   ImgUrl: result[0].ImgURL
               }
    
               con.query(sql1, (err, response) => {
                   if(err){
                       console.log(err);
                   }
                   else{
                       for(var i=response.length-1; i>=0; i--){
                            reviews[i - (response.length - 1)] = {
                               date: response[i].date,
                               tutor: response[i].tutor,
                               student: response[i].student,
                               content: response[i].content, 
                           }
                       } 
                       res.json({
                           profile: profile,
                           reviews: reviews
                       });
                   }
               })
               
            }
        })   

    }
    else if(role=='student'){
        var sql = "select * from Student where email='"+email+"'";

        con.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.json({
                    profile: null
                });
            }
            else{
                console.log(result);
                var profile = {
                    Name: result[0].name,
                    Mobile: result[0].mobile,
                    Location: result[0].location,
                    email: email
                }

                res.json({
                    profile: profile
                });
            }
        })
    }
    
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
                res.send({
                    success: true
                });
            }
        });
    }
});

module.exports = router;