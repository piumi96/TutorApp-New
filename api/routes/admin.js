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

/* router.get('/districtCount', (req, res) => {
    var district = [];
    const districtCount = [];

    var sql = "select * from District";
    
    con.query(sql, (err, result) => {
        if(err){
            throw err;
        }
        else{
            for(var i=0; i<result.length; i++){
                district[i] = result[i].name;
                var sql1 = "select * from Tutor where location = '" + district[i]+ "'";

                con.query(sql1, (err, result) => {
                    if(err) throw err;
                    else{
                        districtCount[i] = result.length;
                    }
                }) 
                console.log(districtCount);

            }    
        }
    })
}) */

module.exports = router;