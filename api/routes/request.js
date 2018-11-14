const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.get('/viewRequests', (req, res) => {
    var tutor = req.body.tutor;

    var sql = "select * from Requests where tutor = '"+tutor+"' and status='SENT'";
    con.query(sql, (err, result) => {
        if(err) throw err;
        else{
            //console.log(result);
            var request = [];
            for(var i=0; i<result.length; i++){
                request[i] = {
                    id: result[i].reqID,
                    student: result[i].student,
                    sent_date: result[i].sent_date,
                    day: result[i].day,
                    time: result[i].time,
                    subject: result[i].subject
                }
            }

            res.json({
                request: request
            });
        }
    });
})

router.post('/makeRequest', (req, res) => {
    var student = req.body.student;
    var tutor = req.body.tutor;
    var day = req.body.day;
    var time = req.body.time;
    var subject = req.body.subject;

    var sql = "insert into Requests(tutor, student, sent_date, day, time, subject, status) values('"+tutor+"', '"+student+"', CURDATE()+1, '"+day+"', '"+time+"', '"+subject+"', 'SENT')";

    con.query(sql, (err, result) => {
        if(err) throw err;
        else{
            //console.log(result);
            res.json({
                success: true
            });
        }
    });
});

router.put('/acceptRequest', (req, res) => {
    var id = req.body.id;
    var sql = "update Requests set status='ACCEPTED' where reqID = '"+id+"'";

    con.query(sql, (err, result) => {
        if(err) throw err;
        else{
            //console.log(result);
            res.json({
                success: true
            });
        }
    });
});

router.put('/rejectRequest', (req, res) => {
    var id = req.body.id;
    var sql = "update Requests set status='REJECTED' where reqID = '"+id+"'";

    con.query(sql, (err, result) => {
        if(err) throw err;
        else{
            //console.log(result);
            res.json({
                success: true
            });
        }
    });
});


module.exports = router;