const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
const mySQLEvents = require('mysql-events');

router.post('/writeReview', (req, res) => {
    var student = req.body.student;
    var tutor = req.body.tutor;
    var content = req.body.content;

    var sql2 = "select * from Requests where tutor='"+tutor+"' and student='"+student+"' and status='ACCEPTED'"
    con.query(sql2, (err, result) => {
        if(err) throw err;
        else if(result.length!=0){
            var sql = "insert into Review(date, tutor, student, content) values (CURDATE(), '"+tutor+"', '"+student+"', '"+content+"')";
            con.query(sql, (err, result) => {
                if(err) {
                    res.json({
                        success: false,
                        review: null,
                        allowed: true
                    })
                }
                else{
                    var sql1 = "select*from Review where tutor='"+tutor+"'";
                    con.query(sql1, (err, result) => {
                        if(err) throw err;
                        else{
                            var review = [];
                            for(var i=0; i<result.length; i++){
                                review[i] = {
                                date: result[i].date,
                                tutor: result[i].tutor,
                                student: result[i].student,
                                content: result[i].content,
                               }
                            }
        
                            res.json({
                                success: true,
                                review: review,
                                allowed: true
                            });
                        }
                    })
                }
            })

        }
        else{
            res.json({
                success: false,
                review: null,
                allowed: false
            })
        }
    })
    
});

router.get('/viewMyReviews', (req, res) => {
    var tutor = req.body.tutor;
    var sql = "select * from Review where tutor='"+tutor+"'";

    con.query(sql, (err, result) => {
        if (err){
            res.json({
                review: null
            })
        }
        else {
            var review = [];
            for (var i = 0; i < result.length; i++) {
                review[i] = {
                    date: result[i].date,
                    tutor: result[i].tutor,
                    student: result[i].student,
                    content: result[i].content,
                }
            }

            res.json({
                review: review
            });
        }
    })

})
module.exports = router;