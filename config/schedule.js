const express = require('express');
const router = express.Router();
const con = require('../databse/db');
var schedule = require('node-schedule');

schedule.scheduleJob('0 0 * * *', BoostExpiryDailyCheckup);
schedule.scheduleJob('53 * * * *', HourlyPriorityReduction);
schedule.scheduleJob('0 0 * * *', BoostOfferDailyCheckup);
schedule.scheduleJob('0 0 * * *', NewsFeedCheckup);
schedule.scheduleJob('0 0 * * *', RateDailyCheckup);

 


////daily boost expiry schedule
function BoostExpiryDailyCheckup() {
    var sql4 = "select * from ProfileBoost where ProfileBoost.expiryDate < CURRENT_TIMESTAMP";

    con.query(sql4, (err, result) => {
        console.log(result);
        if (err) {
            console.log(err);
        }
        else {
            for (var i = 0; i < result.length; i++) {
                var sql5 = "delete from ProfileBoost where ProfileBoost.email = '" + result[i].email + "'";
                var sql6 = "update Tutor set Tutor.priority=200 where Tutor.email = '" + result[i].email + "'";

                con.query(sql5, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        con.query(sql6, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                });
            }
        }
    });
}

///hourly schedule for re-setting reach count and priority reductions
function HourlyPriorityReduction(){
    var sql = "select ViewCount.tutor,ViewCount.hourlyReachCount,Tutor.priority from ViewCount LEFT JOIN Tutor on Tutor.email=ViewCount.tutor where ViewCount.hourlyReachCount>0";

    con.query(sql, (err, result) => {
        console.log(result.length);
        if (err) {
            console.log(err);
        } else if (result.length == 0) {
            console.log("no searches in this hour");
        } else {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                console.log("blah");
                if (result[i].priority > 500) {

                    var sql2 = "update Tutor,ViewCount set priority=priority-'" + result[i].hourlyReachCount + "'*10,viewCount=viewCount+'" + result[i].hourlyReachCount + "' where Tutor.email='" + result[i].tutor + "' AND ViewCount.tutor='" + result[i].tutor + "'";

                    con.query(sql2, (err, result2) => {
                        // console.log(result2);
                        if (err) {
                            console.log(err);
                        }
                    });
                } else {
                    var sql2 = "update Tutor,ViewCount set priority=priority-'" + result[i].hourlyReachCount + "',viewCount=viewCount+'" + result[i].hourlyReachCount + "' where Tutor.email='" + result[i].tutor + "' AND ViewCount.tutor='" + result[i].tutor + "'";
                    con.query(sql2, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
                var sql3 = "update ViewCount set hourlyReachCount = 0 where tutor='" + result[i].tutor + "'";
                con.query(sql3, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("successfull");
                    }
                });
            }
        }
    });
}

function BoostOfferDailyCheckup() {
    var sql = "select * from BoostOffers where CURRENT_TIMESTAMP() > expirydate";
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            for (var i = 0; i < result.length; i++) {
                var discount = result[i].discount;
                var oldPrice = result[i].price;
                var newPrice = (oldPrice * 100) / (100 - discount);

                var sql1 = "update BoostOffers set discount='0', price='" + newPrice + "' where package='" + result[i].package + "'";
                con.query(sql1, (err, response) => {
                    if (err) throw err;
                    console.log(response);
                })
            }
        }
    })
}

function RateDailyCheckup() {
    var sql = "select email, avg(rating) as newRate from Tutor right join Rate on Tutor.email=Rate.tutor group by Tutor.email";

    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                var sql1 = "update Tutor set rate = '" + result[i].newRate + "' where email='" + result[i].email + "'";
                con.query(sql1, (err, response) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(response);
                    }
                })
            }
        }
    })
}

function NewsFeedCheckup() {
    var sql = "delete from NewsFeed where expiryDate < CURRENT_TIMESTAMP";
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result);
        }
    })
}

