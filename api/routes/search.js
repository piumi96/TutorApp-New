const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.post('/search', (req, res) => {
    var district =req.body.district;
    var subject = req.body.subject;

    if(district === "all" && subject=="all"){

        var sql = "select * from Tutor where acc_status='1'";
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

    else if(subject=="all" && district != "all"){

        var sql = "select * from Tutor where Location like '%"+district+"%' and acc_status='1'";
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

    else if(district=="all" && subject != "all"){
        var sql = "select * from Tutor where Subject like '%"+subject+"%' and acc_status='1'";
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

    else if(subject != "all" && district != "all"){
        var sql = "select * from Tutor where (Location like '%"+district+"%' and Subject like '%"+subject+"%' and acc_status='1')";
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