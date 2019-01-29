const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.get('/subject', (req, res) => {
    var sql = "select * from Subject";

    con.query(sql, (err, result) => {
        if(err) throw err;
        else{
            var subject = [];
            for(var i=0; i<result.length; i++){
                subject[i] = result[i].Name;
            }
            subject[result.length] = "all";
            res.json({
                subject: subject
            });
        }
    });
});

router.get('/subjectCount', (req, res) => {
    var sql = "select email, Tutor.Subject, SubjectID from Tutor, Subject where Tutor.Subject=Subject.Name order by SubjectID";
    var sql2 = "select student, Requests.subject, SubjectID from Requests, Subject where Requests.subject=Subject.Name order by SubjectID";
    var sql1 = "select * from Subject";
    var subject = 0;
    
    con.query(sql1, (err, response) => {
        if(err) throw err;
        else{
            subject = response.length;
            var Scount = [];
            var Tcount = [];

            for(var i=0; i<=subject; i++){
                Tcount[i] = 0;
                Scount[i] = 0;
            }

            con.query(sql, (err, result) => {
                if(err) throw err;
                else{
                    console.log(result);
                    for(var i=0; i<result.length; i++){
                        for(var j=1; j<=subject; j++){
                            if(result[i].SubjectID==j){
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

})

module.exports = router;

