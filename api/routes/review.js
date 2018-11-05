const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.post('/review', (req, res) => {
    var student = req.body.student;
    var tutor = req.body.tutor;
    var content = req.body.content;
    
    var sql = "insert into Review(date, tutor, student, content) values (CURDATE(), '"+tutor+"', '"+student+"', '"+content+"')";
    con.query(sql, (err, result) => {
        if(err) throw err;
        else{
            var sql1 = "select*from Review";
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
                        review: review
                    });
                }
            })
        }
    })
});

module.exports = router;