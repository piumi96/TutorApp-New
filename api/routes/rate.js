const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const con = require('../../databse/db');

router.post('/rate', (req, res) => {
    var rate = req.body.rate;
    var tutor = req.body.tutor;
    var student = req.body.student;
   // var priority = req.body.priority;

    var sql1 = "select * from Requests where tutor='" + tutor + "' and student='" + student + "' and status='ACCEPTED'";
    var sql2 = "select * from Rate where tutor='" + tutor + "' and student='" + student + "'";
    var sql4 = "insert into Rate(tutor, student, rating) values('" + tutor + "', '" + student + "', '" + rate + "')";
    var sql5 = "update Rate set rating = '" + rate + "' where tutor='" + tutor + "' and student='" + student + "'";
   // var sql7 = "update Tutor set priority = priority + '"+priority+"' where email = '"+tutor+"' AND priority>500 AND (priority+'"+priority+"'<=500)";


    var success = false;
    var allowed = false;

    con.query(sql1, (err, result1) => {
        if(err){
            console.log(err);
        }
        if(result1.length!=0){
            con.query(sql2, (err, result2) => {
                if(err){
                    console.log(err);
                }
                if(result2.length !=0){
                   con.query(sql5, (err, result3) => {
                       if(err){
                           console.log(err);
                       }
                       console.log(result3);
                   }) 
                }
                else{
                    con.query(sql4, (err, result3) => {
                        if(err){
                            console.log(err);
                        }
                        console.log(result3);
                    })
                }
            })

            res.json({
                success: true,
                allowed: true
            });
            
        }
        else{
            res.json({
                success: success,
                allowed: allowed,
                rate: rate
            });
        }

    });

});

router.get('/highestRate', (req, res) => {
    var sql = "select * from Tutor order by Rate desc";

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                tutorList: null
            });
        }
        else{
            console.log(result);
            var tutorList = [];
            for(var i = 0; i<5; i++){
                tutorList[i] = {
                    name: result[i].FirstName + " " + result[i].LastName,
                    rate: result[i]. Rate,
                    img: result[i].ImgUrl
                };
            };
            res.json({
                success: true,
                tutorList: tutorList
            });
        }
    });
});

module.exports = router;