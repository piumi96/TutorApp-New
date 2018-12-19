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
                        email: result[i].email,
                        location: '',
                        mobile: '',
                        subject: '',
                        rate: '',
                        imgURL: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        user[i].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[i].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[i].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[i].rate = result[i].Rate;
                    }
                    if (result[i].ImgURL) {
                        user[i].imgURL = result[i].ImgURL;
                    }
                    if (result[i].Price) {
                        user[i].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[i].available = result[i].Available_time;
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
                        email: result[i].email,
                        location: '',
                        mobile: '',
                        subject: '',
                        rate: '',
                        imgURL: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        user[i].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[i].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[i].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[i].rate = result[i].Rate;
                    }
                    if (result[i].ImgURL) {
                        user[i].imgURL = result[i].ImgURL;
                    }
                    if (result[i].Price) {
                        user[i].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[i].available = result[i].Available_time;
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
                        email: result[i].email,
                        location: '',
                        mobile: '',
                        subject: '',
                        rate: '',
                        imgURL: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        user[i].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[i].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[i].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[i].rate = result[i].Rate;
                    }
                    if (result[i].ImgURL) {
                        user[i].imgURL = result[i].ImgURL;
                    }
                    if (result[i].Price) {
                        user[i].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[i].available = result[i].Available_time;
                    }

                }
                res.send({
                    user: user
                });
            }
        })
    }

    else if(subject != "all" && district != "all"){
        var sql = "select * from Tutor where (Location like '%" + district + "%' and Subject like '%" + subject +"%' and acc_status='1' )";
        con.query(sql, function(err, result){
            if(err) throw err;
            else{
                var user = [];
                for(var i=0; i<result.length; i++){
                    user[i] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        email: result[i].email,
                        location: '',
                        mobile: '',
                        subject: '',
                        rate: '',
                        imgURL: '',
                        price: '',
                        available: ''

                    }

                    if (result[i].Location) {
                        user[i].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[i].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[i].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[i].rate = result[i].Rate;
                    }
                    if (result[i].ImgURL) {
                        user[i].imgURL = result[i].ImgURL;
                    }
                    if (result[i].Price) {
                        user[i].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[i].available = result[i].Available_time;
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