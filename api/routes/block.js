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

router.put('/unblock', (req, res) => {
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
})

router.get('/blockList', (req, res) => {
    var Tlist = [];
    var Slist = [];
    var sql = "select FirstName, LastName from Tutor where acc_status='0'";
    var sql1 = "select name from Student where acc_status='0'"

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            Tlist = null;
        }
        else{
            for(var i=0; i<result.length; i++){
                Tlist[i] = {
                    FirstName: result[i].FirstName,
                    LastName: result[i].LastName
                }
            }
            //console.log(Tlist);
            con.query(sql1, (err, result) => {
                if(err){
                    console.log(err);
                    Slist = null;
                }
                else{
                    for(var i=0; i<result.length; i++){
                        Slist[i] = {
                            name: result[i].name
                        }
                    }
                    //console.log(Slist)
                    res.json({
                        Tlist: Tlist,
                        Slist: Slist
                    })
                }
            })
        }
    })


})

module.exports = router;