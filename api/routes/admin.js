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





module.exports = router;