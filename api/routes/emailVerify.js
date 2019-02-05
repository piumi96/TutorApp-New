const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
const randomstring = require('randomstring');

router.post('/verify', (req, res) => {
    var token = req.body.token;
    var role = req.body.role;
    var email = req.body.email;
    
    if(role=='tutor'){
        var sql = "select token from Tutor where email='"+email+"'";
        var sql2 = "update Tutor set confirmed = 1 where email='"+email+"'";
    }
    else if(role=='student'){
        var sql = "select token from Student where email='"+email+"'";
        var sql2 = "update Student set confirmed = 1 where email='" + email + "'";
    }

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false
            });
        }
        else{
            console.log(result[0].token);
            if(result[0].token==token){
                con.query(sql2, (err, response) => {
                    if(err){
                        console.log(err);
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
            else{
                res.json({
                    success: false
                })
            }

        }
    })
    
})

module.exports = router;