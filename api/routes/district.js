const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.get('/district', (req, res) => {
    var sql = "select * from District";
    var district = [];

    con.query(sql, (err, result) => {
        if(err){
            res.json({
                district: null
            });
        }
        else{
            for(var i=0; i<result.length; i++){
                district[i] = {
                    districtID: result[i].DistrictID,
                    name: result[i].name
                }
            }
            res.json({
                district: district
            })
        }
    })
})

router.get('/districtCount', (req, res) => {
    var sql = "select email, Location, DistrictID from Tutor, District where District.name=Tutor.Location order by Location";
    var sql2 = "select email, location, DistrictID from Student, District where District.name=Student.Location order by Location";

    var Tcount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var Scount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    con.query(sql, (err, result) => {
        if(err){
            Tcount = null;
        } 
        else{
            //console.log(result);
            for(var i=0; i<result.length; i++){
                for(var j=1; j<=25; j++){
                    if(result[i].DistrictID==j){
                        Tcount[j]++;
                        break;
                    }
                }

            }

            con.query(sql2, (err, result) => {
                if(err){
                    Scount = null;
                }
                else{
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
})

module.exports = router;


