const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.post('/viewAllRequests', (req, res) => {
    var tutor = req.body.tutor;

    var sql = "select reqID, sent_date, day, Requests.location, subject, name from Requests, Student where tutor = '"+tutor+"' and status='SENT' and Requests.student=Student.email";
    con.query(sql, (err, result) => {
        if(err) throw err;
        else{
            //console.log(result);
            var request = [];
            for(var i=0; i<result.length; i++){
                request[i] = {
                    id: result[i].reqID,
                    student: result[i].name,
                    sent_date: result[i].sent_date,
                    day: result[i].day,
                    location: result[i].location,
                    subject: result[i].subject
                }
            }

            res.json({
                request: request
            });
        }
    });
})

router.post('/viewMyRequests', (req, res) => {
    var student = req.body.student;

    var sql = "select reqID, sent_date, day, Requests.location, Requests.subject, tutor, status, FirstName, LastName from Requests, Tutor where Requests.student='"+student+"' and Requests.tutor = Tutor.email";
    con.query(sql, (err, result) => {
        if(err) throw err;
        else{
            var request = [];
            for(var i=0; i<result.length; i++){
                //console.log(result)
                request[i] = {
                    id: result[i].reqID,
                    tutor: result[i].tutor,
                    FirstName: result[i].FirstName,
                    LastName: result[i].LastName,
                    sent_date: result[i].sent_date,
                    day: result[i].day,
                    location: result[i].location,
                    subject: result[i].subject,
                    status: result[i].status
                }
            }

            res.json({
                request: request
            });

        }
    })
})

router.get('/viewRequest', (req, res) => {
    var id = req.body.id;
    var sql = "select * from Requests where reqID='"+id+"'";

    con.query(sql, (err, result) => {
        if(err) throw err;
        else{
            var request = {
                id: result[0].reqID,
                student: result[0].student,
                sent_date: result[0].sent_date,
                day: result[0].day,
                location: result[0].location,
                subject: result[0].subject,
                status: result[0].status
            }

            res.json({
                request: request
            });

        }
    })
})

router.post('/makeRequest', (req, res) => {
    var student = req.body.student;
    var tutor = req.body.tutor;
    var day = req.body.day;
    var location = req.body.location;
    var subject = req.body.subject;

    var sql = "insert into Requests(tutor, student, sent_date, day, subject, location, status) values('"+tutor+"', '"+student+"', CURDATE()+1, '"+day+"', '"+subject+"', '"+location+"' , 'SENT')";

    con.query(sql, (err, result) => {
        if(err) throw err;
        else{
            console.log(result);
            res.json({
                success: true
            });
        }
    });
});

router.post('/acceptRequest', (req, res) => {
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

router.post('/rejectRequest', (req, res) => {
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

router.post('/cancelRequest', (req, res) => {
    var id = req.body.id;

    var sql = "delete from Requests where reqID='"+id+"'";
    con.query(sql, (err, result) => {
        if(err){
            //throw err;
            res.json({
                success: false
            });
        }
        else{
            res.json({
                success: true
            });
        }
    })
})


module.exports = router;