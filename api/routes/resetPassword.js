const express = require('express');
const bcrypt = require('bcryptjs');
const con = require('../../databse/db');

const router = express.Router();
var saltRounds = 10;

router.post('/reset', (req, res) => {
    var role = req.body.role;
    var email = req.body.email;
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;

    if(role==='tutor'){

        var sql = "select password from Tutor where email='"+email+"'";
     
        con.query(sql, (err, result) => {
            if(err) throw err;
            else{
                var pass = result[0].password;
                /* console.log(pass);
                console.log(oldPassword); */

                bcrypt.compare(oldPassword, pass, (err, response)=> {
                    if(err) throw err;
                    else if(response){
                        bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                            if (err) throw err;
                            else{
                                var sql1 = "update Tutor set Tutor.password='"+hash+"' where Tutor.email='"+email+"'";
                                con.query(sql1, (err, response) => {
                                    if(err) {
                                        throw err;
                                        res.json({
                                            sucess: false
                                        });
                                    }
                                    else{
                                        res.json({
                                            success: true
                                        });
                                        console.log(response);
                                    }
                                });
                            }
                        });
                        
                    }
                    else{
                        res.json({
                            success: false
                        });
                    }
                });
            }
        })
    }

    else if(role==='student'){
        var sql = "select pword from Student where email='"+email+"'";
     
        con.query(sql, (err, result) => {
            if(err) throw err;
            else{
                var pass = result[0].pword;
                /* console.log(pass);
                console.log(oldPassword); */

                bcrypt.compare(oldPassword, pass, (err, response)=> {
                    if(err) throw err;
                    else if(response){
                        bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                            if (err) throw err;
                            else{
                                var sql1 = "update Student set Student.pword='"+hash+"' where Student.email='"+email+"'";
                                con.query(sql1, (err, response) => {
                                    if(err) {
                                        throw err;
                                        res.json({
                                            sucess: false
                                        });
                                    }
                                    else{
                                        res.json({
                                            success: true
                                        });
                                        console.log(response);
                                    }
                                });
                            }
                        });
                        
                    }
                    else{
                        res.json({
                            success: false
                        });
                    }
                });
            }
        })
    }

});

module.exports = router