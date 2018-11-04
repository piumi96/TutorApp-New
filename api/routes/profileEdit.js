const express = require('express');
const router = express.Router();

const con = require('../../databse/db');

router.put('/editProfile', (req, res) => {
    var role = req.body.role;
    var email = req.body.email;
    console.log(req);

    if(role === 'tutor'){
        var fname = req.body.fname;
        var lname = req.body.lname;
        var mobile =  req.body.mobile;
        var subject = req.body.subject;
        var location = req.body.location;
    
        var sql = "update Tutor set FirstName='"+fname+"', LastName='"+lname+"', Mobile='"+mobile+"', Subject='"+subject+"', location='"+location+"' where email='"+email+"'";

        con.query(sql, function(err, result){
            if (err){
                res.status(404).send({
                    success:false
                });
            }
            else {
                //console.log(result);
                res.send({
                    success:true
                });
            }
        });
    
    }

    if(role === 'student'){
        var name = req.body.name;
        var mobile = req.body.mobile;
        var location = req.body.location;

        var sql = "update Student set name='"+name+"', mobile='"+mobile+"', location='"+location+"' where email='"+email+"'";

        con.query(sql, function(err, result){
            if (err){
                res.status(404).send({
                    success:false
                });
            }
            else{
                //console.log(result);
                res.send({
                    success:true
                });
            }
        });
    }
});

module.exports = router;