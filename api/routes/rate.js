const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.post('/rate', (req, res) => {
    var rate = req.body.rate;
    var tutor = req.body.tutor;
    var student = req.body.student;

    var rating;
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
    });

})

module.exports = router;