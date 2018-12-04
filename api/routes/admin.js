const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.get('/adminDash', (req, res) => {
    var sql = "select * from Student";
    var sql1 = "select * from Tutor";
    var sql2 = "select * from Suggestions";

    var Studentcount = null;
    var Tutorcount = null;
    var Msgcount = null;

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            Studentcount = null;
        }
        else{   
            Studentcount = result.length;
            con.query(sql1, (err, result) => {
                if (err) {
                    console.log(err);
                    Tutorcount = null;
                }
                else {
                   Tutorcount = result.length;
                   con.query(sql2, (err, response) => {
                       if (err) {
                           console.log(err);
                           Msgcount = null
                       }
                       else {
                           Msgcount = response.length;
                           con.query(sql3, (err, result) => {
                               if(err){
                                   throw err;
                               }
                               else{
                                   res.json({
                                       Studentcount: Studentcount,
                                       Tutorcount: Tutorcount,
                                       Msgcount: Msgcount
                                   });
                               }
                           })
                       }
                   })
               
                }
            })
        }
    })

});



module.exports = router;