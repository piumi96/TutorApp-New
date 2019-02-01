const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.post('/rate', (req, res) => {
    var rate = req.body.rate;
    var tutor = req.body.tutor;
    var student = req.body.student;

    var sql1 = "select * from Requests where tutor='" + tutor + "' and student='" + student + "' and status='ACCEPTED'";
    var sql2 = "select * from Rate where tutor='" + tutor + "' and student='" + student + "'";
    var sql3 = "update Tutor set Tutor.rate = (select avg(Rate.rating) from Rate where Rate.tutor='" + tutor + "') where Tutor.email='" + tutor + "'";
    var sql4 = "insert into Rate(tutor, student, rating) values('" + tutor + "', '" + student + "', '" + rate + "')";
    var sql5 = "update Rate set rating = '" + rate + "' where tutor='" + tutor + "' and student='" + student + "'";
    var sql6 = "select rate from Tutor where email='"+tutor+"'";

    var success = false;
    var allowed = false;
    var rate = null;

    con.query(sql1, (err, result1) => {
        if(err){
            console.log(err);
        }
        if(result1.length!=0){
            con.query(sql2, (err, result2) => {
                if(err){
                    console.log(err);
                }
                if(result2.length !=0){
                   con.query(sql5, (err, result3) => {
                       if(err){
                           console.log(err);
                       }
                       console.log(result3);
                   }) 
                }
                else{
                    con.query(sql4, (err, result3) => {
                        if(err){
                            console.log(err);
                        }
                        console.log(result3);
                    })
                }
            })

            con.query(sql3, (err, response) => {
                if (err) {
                    console.log(err);
                }
                console.log(response);
                allowed = true;
                success = true;
            });
            con.query(sql6, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: success,
                        allowed: allowed,
                        rate: rate
                    });
                }
                console.log(result);
                rate = result[0].rate;
                res.json({
                    success: success,
                    allowed: allowed,
                    rate: rate
                });
            })
            
        }
        else{
            res.json({
                success: success,
                allowed: allowed,
                rate: rate
            });
        }

        

    });



/*     var rating;
    var sql2 = "select rate from Tutor where Tutor.email='"+tutor+"'";
    con.query(sql2, (err, result) => {
        if(err) throw err;
        else{
            rating = result[0].rate;
        }
    })

    var sql3 = "select * from Requests where tutor='"+tutor+"' and student='"+student+"' and status='ACCEPTED'";
    con.query(sql3, (err, result) => {
        if(err) throw err;
        else if(result.length != 0){
            //console.log(result);
            var sql = "insert into Rate(tutor, student, rating) values('"+tutor+"', '"+student+"', '"+rate+"')";
            con.query(sql, (err, result) => {
                if(err){
                    res.json({
                        success: false,
                        rating: rating,
                        allowed: true
                    });            
                } 
                else{
                    var sql1 = "update Tutor set Tutor.rate = (select avg(Rate.rating) as rate from Rate where Rate.tutor='"+tutor+"') where Tutor.email='"+tutor+"'";
                    con.query(sql1, (err, result) => {
                        if(err){
                            res.json({
                                success: false,
                                rating: rating,
                                allowed: true
                            });
                        }
                        else{
                            var sql2 = "select rate from Tutor where Tutor.email='"+tutor+"'";
                            con.query(sql2, (err, result) => {
                            if(err) throw err;
                            else{
                                rating = result[0].rate;
                                }
                            });
        
                            res.json({
                                success: true,
                                rating: rating,
                                allowed: true
                            });
                        }
                    })
                    
                }
            });

        }
        else{
            res.json({
                success: false,
                rating: rating,
                allowed: false
            })
        }
    }); */

});

router.get('/highestRate', (req, res) => {
    var sql = "select * from Tutor order by Rate desc";

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                tutorList: null
            });
        }
        else{
            console.log(result);
            var tutorList = [];
            for(var i = 0; i<5; i++){
                tutorList[i] = {
                    name: result[i].FirstName + " " + result[i].LastName,
                    rate: result[i]. Rate,
                    img: result[i].ImgUrl
                };
            };
            res.json({
                success: true,
                tutorList: tutorList
            });
        }
    })
});

module.exports = router;