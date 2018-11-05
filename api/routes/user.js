const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const con = require('../../databse/db');
const user = require('../../config/passport-setup');

const router = express.Router();
var saltRounds = 10;

router.get('/', (req, res) => {
    res.json({
        response: 'It works!'
    });
});
//Register routes-----------------------------------------------------------------
router.post('/register', (req, res) => {

    var role = req.body.role;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var pword = req.body.password;
    
    bcrypt.hash(pword, saltRounds, function (err, hash) {
        if (role === 'tutor') {
            var sql = "insert into Tutor(FirstName, LastName, email, password) values('" + fname + "', '" + lname + "', '" + email + "', '" + hash + "')";

        }
        else if (role === 'student') {
            var sql = "insert into Student(name, email, pword) values('" + fname + " " + lname + "', '" + email + "', '" + hash + "')";
        }

        var sql2 = "select * from Tutor, Student where Tutor.email='" + email + "' or Student.email='" + email + "'";
        con.query(sql2, function (err, result) {
            if (err) throw err;
            else{
            if (result.length > 0) {
                res.json({
                    has: true,
                    success: false
                });
            }
            else {
                con.query(sql, function (err, result) {
                    console.log(result);
                    if (err) {
                        res.json({
                            has: false,
                            success: false
                        });
                    }
                    else {
                        res.json({
                            has: false,
                            success: true
                        });
                    }
                });
            }}
        });
    });
});



router.post('/google-reg', passport.authenticate('google', {
    scope: ['email']
    
}), (req, res) => {
    var role = req.body.role;
    req.session.email = req.user.email;
    var email = req.session.email;
    const user = {
        fname: email.name.givenName,
        lname: email.name.familyName,
        email: email.emails[0].value 
    };
    
    console.log(email);

    if(role === "tutor"){

        var sql = "insert into Tutor(FirstName, LastName, email) values('"+ user.fname+"','"+user.lname+"','"+user.email+"')";
        var sql1 = "select * from Tutor where email='"+user.email+"'";

        con.query(sql1, (err, result) => {
            if(err) throw err;
            else{
                if (result.length > 0) {
                    res.json({
                        has: true,
                        success: false
                    });
                }
                else{
                    con.query(sql, (err, result) => {
                        if(err){
                            res.json({
                                has: false,
                                success: false
                            });
                        }
                        else{
                            res.json({
                                has: false,
                                success: true
                            });
                        }
                    });
                }
            }
        });
    }

    else if(role === "student"){

        var sql = "insert into Student(name, email) values('" + user.fname + " " + user.lname + "', '" + user.email + "')"
        var sql1 = "select * from Student where email='" + user.email + "'";

        con.query(sql1, (err, result) => {
            if(err) throw err;
            else{
                if (result.length > 0) {
                    res.json({
                        has: true,
                        success: false
                    });
                }
                else{
                    con.query(sql, (err, result) => {
                        if(err){
                            res.json({
                                has: false,
                                success: false
                            });
                        }
                        else{
                            res.json({
                                has: false,
                                success: true
                            });
                        }
                    });
                }
            }
        });
    }
   
});



//Login routes------------------------------------------------------------------
router.post('/login', (req, res) => {
    var email = req.body.username;
    var pword = req.body.password;
    var role = req.body.role;

    //role tutor-------

    if (role === 'tutor') {
        var sql = "select * from Tutor where email='" + email + "'";
        var sql2 = "select password from Tutor where email = '" + email + "'";

        con.query(sql, function (err, result) {
            if (err) throw err;
            else {
                if (result.length == 0) {
                    res.send({
                        msg: 'Email does not exist'
                    });
                }
                else {

                    var fname = result[0].FirstName;
                    var lname = result[0].LastName;
                    var status = result[0].acc_status;
                    var location, mobile, subject;

                    if (result[0].Location) {
                        location = result[0].Location;
                    }
                    else {
                        location = '';
                    }

                    if (result[0].Mobile) {
                        mobile = result[0].Mobile;
                    }
                    else {
                        mobile = '';
                    }

                    if (result[0].Subject) {
                        subject = result[0].Subject;
                    }
                    else {
                        subject = '';
                    }

                    con.query(sql2, function (err, result) {
                        if (err) throw err;
                        else {
                            var pass = result[0].pword;
                            bcrypt.compare(pword, pass, function (err, response) {
                                if (err) throw err;
                                else if (response) {
                                    const user = {
                                        fname: fname,
                                        lname: lname,
                                        mobile: mobile,
                                        subject: subject,
                                        location: location,
                                        role:role,
                                        email:email,
                                        status: status
                                    };

                                    const token = jwt.sign({ user }, 'secret_key');
                                    console.log(user);
                                    console.log(token);

                                    res.json({
                                        token: token,
                                    });
                                }
                                else {
                                    res.send({
                                        token: null,
                                    })
                                }

                            });
                        }
                    });

                }
            }
        });

    }

    //role student------

    if (role === 'student') {
        var sql = "select * from Student where email='" + email + "'";
        var sql2 = "select pword from Student where email = '" + email + "'";

        con.query(sql, function (err, result) {
            if (err) throw err;
            else {
                if (result.length == 0) {
                    res.send({
                        msg: 'Email does not exist'
                    });
                }
                else {
                    console.log(result);
                    var name = result[0].name;
                    var status =result[0].acc_status;
                    var location, mobile;

                    if (result[0].location) {
                        location = result[0].location;
                    }
                    else {
                        location = '';
                    }

                    if (result[0].mobile) {
                        mobile = result[0].mobile;
                    }
                    else {
                        mobile = '';
                    }

                    con.query(sql2, function (err, result) {
                        if (err) throw err;
                        else {
                            var pass = result[0].pword;
                            bcrypt.compare(pword, pass, function (err, response) {
                                if (err) throw err;
                                else if (response) {
                                    const user = {
                                        name: name,
                                        mobile: mobile,
                                        location: location,
                                        email:email,
                                        role:role,
                                        status: status
                                    };

                                    const token = jwt.sign({ user }, 'secret_key');
                                    console.log(user);
                                    console.log(token);

                                    res.json({
                                        token: token,
                                    });
                                }
                                else {
                                    res.send({
                                        token: null
                                    })
                                }

                            });
                        }
                    });

                }
            }
        });
    }

});

router.post('/google-login', passport.authenticate('google-login', {
    scope: ['email']
    
}), (req, res) => {
    var role = req.body.role;

    req.session.email = req.user.email;
    var email = req.session.email;
    var user = {
        email: email.emails[0].value
    };

    if(role==="tutor"){
        var sql = "select * from Tutor where email='"+user.email+"'";
        var token = null;
        con.query(sql, (err, result) => {
            if(err) throw err; 
            else{  
                var fname = result[0].FirstName;
                var lname = result[0].LastName;
                var status = result[0].acc_status;
                var location, mobile, subject;
    
                if (result[0].Location) {
                    location = result[0].Location;
                }
                else {
                    location = '';
                }
    
                if (result[0].Mobile) {
                    mobile = result[0].Mobile;
                }
                else {
                    mobile = '';
                }
    
                if (result[0].Subject) {
                    subject = result[0].Subject;
                }
                else {
                    subject = '';
                }

                const tutor = {
                    fname: fname,
                    lname: lname,
                    mobile: mobile,
                    subject: subject,
                    location: location,
                    role: role,
                    email: user.email,
                    status: status
                }

                token = jwt.sign({ tutor }, 'secret_key');
            }

            res.json({
                token: token
            });
        });
    }

    else if(role==="student"){
        var sql = "select * from Tutor where email='"+user.email+"'";
        var token = null;
        
        con.query(sql, (err, result) => {
            if(err) throw err;
            else{
                var name = result[0].name;
                var status =result[0].acc_status;
                var location, mobile;

                if (result[0].location) {
                    location = result[0].location;
                }
                else {
                    location = '';
                }

                if (result[0].mobile) {
                    mobile = result[0].mobile;
                }
                else {
                    mobile = '';
                } 

                var student = {
                    name: name,
                    location: location,
                    mobile: mobile,
                    email: user.email,
                    acc_status: status,
                    role: role
                };
                token = jwt.sign({ student }, 'secret_key');

            }

            res.json({
                token: token
            });
        });
    }
});

module.exports = router;