const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.get('/allStudents', (req, res) => {
    var sql = "select * from Student";

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                count: null
            })
        }
        else{
            res.json({
                count: result.length
            })


        }
    })
})

module.exports = router;