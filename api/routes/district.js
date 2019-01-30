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


module.exports = router;


