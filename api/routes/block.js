const express = require('express');
const router = express.Router();

const con = require('../../databse/db');

router.put('/block', (req, res) => {
    var role = req.body.role;
    var email = req.body.email;

    if(role==='tutor'){
        var sql = "update Tutor set acc_status='0' where email='"+email+"'";
        con.query(sql, (err, result) => {
            if(err){
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
    }
    else if(role==='student'){
        var sql = "update Student set acc_status='0' where email='"+email+"'";
        con.query(sql, (err, result) => {
            console.log(result);
            if(err){
                res.json({
                    success: false
                });
            }
            else{
                res.json({
                    success: true
                })
            }
        })
    }
})

/* router.put('/unblock', (req, res) => {
    var role = req.body.role;
    var email = req.body.email;

    if (role === 'tutor') {
        var sql = "update Tutor set acc_status='1' where email='" + email + "'";
        con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    success: false
                });
            }
            else {
                res.json({
                    success: true
                });
            }
        })
    }
    else if (role === 'student') {
        var sql = "update Student set acc_status='1' where email='" + email + "'";
        con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    success: false
                });
            }
            else {
                res.json({
                    success: true
                })
            }
        })
    }
}) */

module.exports = router;