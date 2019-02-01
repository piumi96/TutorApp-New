const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
const schedule = require('node-schedule');

router.post('/boostprofile', (req, res) => {
    var tutor = req.body.tutor;
    var package = req.body.package;

    var sql = "select * from Tutor where Tutor.email='" + tutor + "' and Tutor.rate>=3";
    var sql2 = "insert into ProfileBoost(email, package, startDate, expiryDate) values('" + tutor + "','" + package + "', CURRENT_TIMESTAMP(), TIMESTAMPADD(DAY,7,CURRENT_TIMESTAMP()))";
    var sql3 = "select * from ProfileBoost where email = '" + tutor + "'";
    var sql7 = "update Tutor set Tutor.priority = 5000 where Tutor.email = '" + tutor + "'";


    con.query(sql, (err, result1) => {
        if (err) {
            res.json({
                success: false,
                allowed: null,
                //    response: 'error!' 
            });
        } else if (result1.length == 0) {
            res.json({
                success: false,
                allowed: false,
                //    response: 'Insufficient Rating!' 
            });
        } else {
            con.query(sql3, (err, result2) => {
                if (err) {
                    res.json({
                        success: false,
                        allowed: null,
                        //    response: 'error!' 
                    });
                }
                else if (result2.length == 0) {
                    con.query(sql2, (err, result3) => {
                        if (err) {
                            res.json({
                                success: false,
                                allowed: null,
                                // response: 'DB entry error!'
                            });
                        } else {
                            var today = new Date();
                            today.setHours(0, 0, 0, 0);
                            var expiry = new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000));
                            var remaining = Math.floor((expiry.valueOf() - today.valueOf()) / (1000 * 60 * 60 * 24));
                            var user = {
                                tutor: tutor,
                                package: package,
                                start: today,
                                end: expiry,
                                remaining: remaining

                            }
                            res.json({
                                success: true,
                                allowed: true,
                                user: user
                                // response: 'boosted!'
                            });
                            con.query(sql7, (err) => {
                                if (err) {
                                    res.json({
                                        success: false,
                                        allowed: null
                                    });
                                }
                            });
                        }
                    });
                } else {
                    var user = {
                        tutor: result2[0].email,
                        package: result2[0].package,
                        start: result2[0].startDate,
                        end: result2[0].expiryDate,
                        remaining: (result2[0].expiryDate.valueOf() - result2[0].startDate.valueOf()) / (1000 * 3600 * 24)
                    }
                    //  console.log(user);
                    res.json({
                        success: true,
                        allowed: false,
                        user: user
                        // response: 'Profile is already boosted!'
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

function DailyCheckup() {
    var sql4 = "select * from ProfileBoost where ProfileBoost.expiryDate < CURRENT_TIMESTAMP";

    con.query(sql4, (err, result) => {
        if (err) {
            res.json({
                success: false,
                allowed: null,
                //    response: 'error!' 
            });
        }
        else {
            for (var i = 0; i < result.length; i++) {
                var sql5 = "delete from ProfileBoost where ProfileBoost.email = '" + result[i].email + "'";
                var sql6 = "update Tutor set Tutor.priority=200 where Tutor.email = '" + result[i].email + "'";
                // var sql6 = "update Tutor set Tutor.boostStatus=0 where Tutor.email='"+result[i].email+"'";

                con.query(sql5, (err) => {
                    if (err) {
                        res.json({
                            success: false,
                            allowed: null,
                            //    response: 'error!' 
                        });
                    } else {
                        con.query(sql6, (err) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    allowed: null,
                                });
                            }
                        });
                    }
                });
            }
        }
    });
}


// schedule.scheduleJob('0 0 * * *', DailyCheckup);

// //checking for delays if any
// var Delay = schedule.scheduleJob('0 0 * * *', function(fireDate){
//     console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
// });
// */

router.post('/boost', (req, res) => {
    var tutor = req.body.tutor;
    var sql = "select * from ProfileBoost where email='"+tutor+"'";
    var sql2 = "select package, price from BoostOffers"

    con.query(sql2,(err, response) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                boosted: false,
                packages: null,
                data: null
            })
        }
        var packages = []
        for(var i=0; i<response.length; i++){
            packages[i] = {
                name: response[i].package,
                price: response[i].price
            }
        }
        con.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.json({
                    success: false,
                    boosted: false,
                    packages: null,
                    data: null,
                });
            }
            if(result.length != 0){
                console.log(result);
                var boostData = {
                    package: result[0].package,
                    startDate: result[0].startDate,
                    expiryDate: result[0].expiryDate,
                    remaining: (result[0].expiryDate.valueOf() - result[0].startDate.valueOf()) / (1000 * 3600 * 24)
                }
                res.json({
                    success: true,
                    boost: true,
                    packages: packages,
                    data: boostData
                })
            }
            else{
                res.json({
                    success: true,
                    boost: false,
                    packages: packages,
                    data: null                    
                })
            }
        })
    })
});

router.post('/renewboost', (req, res) => {
    var tutor = req.body.tutor;
    //    console.log(tutor);
    var oldExpiry = req.body.end;

    var sql = "update ProfileBoost set expiryDate = TIMESTAMPADD(DAY,7,'" + oldExpiry + "') where ProfileBoost.email = '" + tutor + "'";
    var sql2 = "update ProfileBoost,Tutor set ProfileBoost.boostPriority = 5000, Tutor.priority = 5000 where ProfileBoost.email = '" + tutor + "' AND Tutor.email = '" + tutor + "'";

    con.query(sql, (err) => {
        if (err) {
            console.log(err);
            res.json({
                success: false
            });
        } else {
            con.query(sql2, (err) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false
                    });
                } else {
                    //successfully re-boosted
                    res.json({
                        success: true
                    });
                }
            });
        }
    });

});

router.post('/getCount', (req, res) => {
    var tutor = req.body.tutor;
    var sql = "select viewCount from ViewCount where tutor='"+tutor+"'";

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                count: null
            });
        }
        console.log(result);
        res.json({
            success: true,
            count: result[0].viewCount
        });
    });
});

module.exports = router;