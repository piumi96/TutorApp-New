const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
var schedule = require('node-schedule');

router.post('/boostprofile', (req, res) =>{
    var tutor = req.body.tutor;
    var package = req.body.package;

     var sql = "select * from Tutor where Tutor.email='"+tutor+"' and Tutor.rate>=3";
     var sql2 = "insert into ProfileBoost(email, package, startDate, expiryDate) values('"+tutor+"','"+package+"', CURRENT_TIMESTAMP(), TIMESTAMPADD(DAY,7,CURRENT_TIMESTAMP()))";
     var sql3 = "select * from ProfileBoost where email = '"+tutor+"' AND boostStatus = 1";
     var sql6 = "update Tutor set Tutor.boostPriority=4 where Tutor.email='"+tutor+"'";
     var sql7 = "update Tutor set Tutor.boostPriority=3 where Tutor.email='"+tutor+"'";
     var sql8 = "update Tutor set Tutor.boostPriority=2 where Tutor.email='"+tutor+"'";


     con.query(sql, (err, result) => {
        if(err){
            throw err;
            res.json({
               success: false,
               allowed: false,
               response: 'error!' 
            });
        }else if(result.length==0){
            res.json({
               success: false,
               allowed: false,
               response: 'Insufficient Rating!' 
            });
        }else{
            con.query(sql3, (err,result) =>{
                if(err) throw err;
                else if(result.length == 0){
                    con.query(sql2, (err, result) =>{
                        if(err){
                            throw err;
                            res.json({
                                success: false,
                                allowed: true,
                                response: 'DB entry error!'
                            });
                        }else{ 
                            if(package=='platinum'){
                                con.query(sql6, (err,result) => {
                                    if(err) throw err;
                                    else{
                                        res.json({
                                            success: true,
                                            allowed: true,
                                            response: 'boosted!'
                                        });
                                 
                                    }
                                });
                            }
                            if(package=='gold'){
                                con.query(sql7, (err,result) => {
                                    if(err) throw err;
                                    else{
                                        res.json({
                                            success: true,
                                            allowed: true,
                                            response: 'boosted!'
                                        });
                                 
                                    }
                                });
                            }
                            if(package=='silver'){
                                con.query(sql8, (err,result) => {
                                    if(err) throw err;
                                    else{
                                        res.json({
                                            success: true,
                                            allowed: true,
                                            response: 'boosted!'
                                        });
                                 
                                    }
                                });
                            }   
                        }
                    });
                }else{
                    res.json({
                        success: true,
                        allowed: false,
                        response: 'Profile is already boosted!'
                    }); 
                }
            });
        }             
     });
});

/*
resetting boost status after a week
var ExpiryCheckupUpdate = setInterval(dailyCheck, 1000*60*60*24); 
*/

function DailyCheckup(){
    var sql4 = "select * from ProfileBoost where ProfileBoost.expiryDate < CURRENT_TIMESTAMP";

    con.query(sql4, (err, result) =>{
        if(err){
            throw err;     
        } 
        else{
            for(var i=0; i<result.length; i++){
                var sql5 = "delete from ProfileBoost where ProfileBoost.email = '"+result[i].email+"'";
                var sql9 = "update Tutor set Tutor.boostPriority=1 where Tutor.email='"+result[i].email+"'";

                con.query(sql5, (err, result) => {
                    if(err) throw err;
                    else{
                      console.log('deleted!');
                    }
                });

                con.query(sql9, (err, result) => {
                    if(err) throw err;
                    else{
                        console.log('priority changed');
                    }
                });
            } 
        }     
    });
}

/* 
schedule.scheduleJob('0 0 * * *', DailyCheckup);

//checking for delays if any
var Delay = schedule.scheduleJob('0 0 * * *', function(fireDate){
    console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
});
*/
 
module.exports = router;





