const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.get('/adminDash', (req, res) => {
    var sql = "select * from Student";
    var sql1 = "select * from Tutor";
    var sql2 = "select * from Suggestions";

    var studentCount = null;
    var tutorCount = null;
    var msgCount = null;

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            studentCount = null;
        }
        else{   
            studentCount = result.length;
            con.query(sql1, (err, result) => {
                if (err) {
                    console.log(err);
                    tutorCount = null;
                }
                else {
                    tutorCount = result.length;
                    con.query(sql2, (err, response) => {
                        if (err) {
                           console.log(err);
                           msgCount = null
                        }
                        else {
                            msgCount = response.length;

                            
                            res.json({
                               studentCount: studentCount,
                               tutorCount: tutorCount,
                               msgCount: msgCount
                            });
                        }
                    })
               
                }
            })
        }
    })

});

router.get('/subjectCount', (req, res) => {
    var sql = "select email, Tutor.Subject, SubjectID from Tutor, Subject where Tutor.Subject=Subject.Name order by SubjectID";
    var sql2 = "select student, Requests.subject, SubjectID from Requests, Subject where Requests.subject=Subject.Name order by SubjectID";
    var sql1 = "select * from Subject";
    var subject = 0;

    con.query(sql1, (err, response) => {
        if (err) throw err;
        else {
            subject = response.length;
            var Scount = [];
            var Tcount = [];

            for (var i = 0; i <= subject; i++) {
                Tcount[i] = 0;
                Scount[i] = 0;
            }

            con.query(sql, (err, result) => {
                if (err) throw err;
                else {
                    console.log(result);
                    for (var i = 0; i < result.length; i++) {
                        for (var j = 1; j <= subject; j++) {
                            if (result[i].SubjectID == j) {
                                Tcount[j]++;
                                break;
                            }

                        }

                    }
                    con.query(sql2, (err, result) => {
                        if (err) {
                            Scount = null;
                        }
                        else {
                            for (var i = 0; i < result.length; i++) {
                                for (var j = 1; j <= 25; j++) {
                                    if (result[i].DistrictID == j) {
                                        Scount[j]++;
                                        break;
                                    }
                                }

                            }
                        }
                        res.json({
                            Tcount: Tcount,
                            Scount: Scount
                        })
                    })
                }

            })
        }
    })

});

router.get('/districtCount', (req, res) => {
    var sql = "select email, Location, DistrictID from Tutor, District where District.name=Tutor.Location order by Location";
    var sql2 = "select email, location, DistrictID from Student, District where District.name=Student.Location order by Location";

    var Tcount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var Scount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    con.query(sql, (err, result) => {
        if (err) {
            Tcount = null;
        }
        else {
            //console.log(result);
            for (var i = 0; i < result.length; i++) {
                for (var j = 1; j <= 25; j++) {
                    if (result[i].DistrictID == j) {
                        Tcount[j-1] = Tcount[j-1]+1;
                        break;
                    }
                }

            }

            con.query(sql2, (err, result) => {
                if (err) {
                    Scount = null;
                }
                else {
                    for (var i = 0; i < result.length; i++) {
                        for (var j = 1; j <= 25; j++) {
                            if (result[i].DistrictID == j) {
                                Scount[j-1] = Scount[j-1]+1;
                                break;
                            }
                        }

                    }
                }
                res.json({
                    Tcount: Tcount,
                    Scount: Scount
                })
            })
        }
    })
})







module.exports = router;