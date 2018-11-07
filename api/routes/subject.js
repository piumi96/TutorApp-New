const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.get('/subject', (req, res) => {
    var sql = "select Name from Subject";

    con.query(sql, (err, result) => {
        if(err) throw err;
        else{
            var subject = [];
            for(var i=0; i<result.length; i++){
                subject[i] = result[i].Name;
            }
            res.json({
                subject: subject
            });
        }
    });
});

module.exports = router;