///new new search algorithm 2
const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.post('/newsearch', (req, res) => {
    var district = req.body.district;
    var subject = req.body.subject;
    var start = req.body.id * 7;
    var end = (req.body.id + 1) * 7;


    if (district == "all" && subject == "all") {
        var sql = "select Tutor.*, ProfileBoost.package from ProfileBoost LEFT JOIN Tutor on Tutor.email=ProfileBoost.email where acc_status='1' order by priority desc";
        var sql3 = "select * from Tutor where acc_status='1' AND priority<=500 order by priority desc";
    }
    else if (subject == "all" && district != "all") {
        var sql = "select Tutor.*, ProfileBoost.package from ProfileBoost LEFT JOIN Tutor on Tutor.email=ProfileBoost.email where Location like '%" + district + "%' AND acc_status='1' order by priority desc";
        var sql3 = "select * from Tutor where Location like '%" + district + "%' AND acc_status='1' AND priority<=500 order by priority desc";
    }
    else if (district == "all" && subject != "all") {
        var sql = "select Tutor.*, ProfileBoost.package from ProfileBoost LEFT JOIN Tutor on Tutor.email=ProfileBoost.email where Subject like '%" + subject + "%' AND acc_status='1' order by priority desc";
        var sql3 = "select * from Tutor where Subject like '%" + subject + "%' AND acc_status='1' AND priority<=500 order by priority desc limit";
    }
    else if (subject != "all" && district != "all") {
        var sql = "select Tutor.*, ProfileBoost.package from ProfileBoost LEFT JOIN Tutor on Tutor.email=ProfileBoost.email where Location like '%" + district + "%' AND Subject like '%" + subject + "%' AND acc_status='1' order by priority desc";
        var sql3 = "select * from Tutor where Subject like '%" + subject + "%' AND Location like '%" + district + "%' AND acc_status='1' AND priority<=500 order by priority desc";

    }

    var goldUser = [];
    var silverUser = [];
    var bronzeUser = [];
    var nonBoostedUser = [];
    var nonBoost = [];
    

    ////getting non-boosted profiles////
    con.query(sql3, (err, result2) => {
        console.log(result2);
        if (err) {
            res.json({
                success: false,
                gold: [],
                silver: [],
                bronze: [],
                nonBoosted: []
            });
        } else if (result2.length == 0) {
            nonBoost = [];
        } else {

            if (end <= result2.length) {
                end = end;
            } else {
                end = result2.length;
            }
            var n = 0;

            for (var i = start; i < end; i++) {
               //console.log(result2[i].email);

                nonBoostedUser[n] = {
                    fname: result2[i].FirstName,
                    lname: result2[i].LastName,
                    email: result2[i].email,
                    location: '',
                    subject: '',
                    mobile: '',
                    rate: '',
                    imgUrl: '',
                    price: '',
                    available: ''

                }
                if (result2[i].Location) {
                    nonBoostedUser[n].location = result2[i].Location;
                }
                if (result2[i].Mobile) {
                    nonBoostedUser[n].mobile = result2[i].Mobile;
                }
                if (result2[i].Subject) {
                    nonBoostedUser[n].subject = result2[i].Subject;
                }
                if (result2[i].Rate) {
                    nonBoostedUser[n].rate = result2[i].Rate;
                }
                if (result2[i].ImgUrl) {
                    nonBoostedUser[n].imgUrl = result2[i].ImgUrl;
                }
                if (result2[i].Price) {
                    nonBoostedUser[n].price = result2[i].Price;
                }
                if (result2[i].Available_time) {
                    nonBoostedUser[n].available = result2[i].Available_time;
                }

                var sql2 = "update ViewCount set hourlyReachCount = hourlyReachCount + 1 where tutor = '" + result2[i].email + "'";
                con.query(sql2, function (err) {
                    if (err) {
                        res.json({
                            success: false,
                            gold: null,
                            silver: null,
                            bronze: null,
                            nonBoosted: null
                        });
                    }
                });
                n++;
            }

            nonBoost = nonBoostedUser;
        }

        ///getting boosted profiles////
        con.query(sql, (err, result) => {
            if (err) {
                res.json({
                    success: false,
                    gold: null,
                    silver: null,
                    bronze: null,
                    nonBoosted: nonBoost
                });
            } else if (result != 0) {

                var goldCount, silverCount, bronzeCount;
                goldCount = silverCount = bronzeCount = 1;
                var j, k, l;
                j = k = l = 0;

                for (var i = 0; i < result.length; i++) {

                    if (result[i].package == 'gold' && goldCount < 2) {

                        //gold profiles
                        goldUser[j] = {
                            fname: result[i].FirstName,
                            lname: result[i].LastName,
                            email: result[i].email,
                            package: result[i].package,
                            location: '',
                            subject: '',
                            mobile: '',
                            rate: '',
                            imgUrl: '',
                            price: '',
                            available: ''

                        }
                        if (result[i].Location) {
                            goldUser[j].location = result[i].Location;
                        }
                        if (result[i].Mobile) {
                            goldUser[j].mobile = result[i].Mobile;
                        }
                        if (result[i].Subject) {
                            goldUser[j].subject = result[i].Subject;
                        }
                        if (result[i].Rate) {
                            goldUser[j].rate = result[i].Rate;
                        }
                        if (result[i].ImgUrl) {
                            goldUser[j].imgUrl = result[i].ImgUrl;
                        }
                        if (result[i].Price) {
                            goldUser[j].price = result[i].Price;
                        }
                        if (result[i].Available_time) {
                            goldUser[j].available = result[i].Available_time;
                        }

                        goldCount++;
                        j++;

                        var sql2 = "update ViewCount set hourlyReachCount = hourlyReachCount + 1 where tutor = '" + result[i].email + "'";
                        con.query(sql2, function (err) {
                            if (err) {
                                res.json({
                                    success: false,
                                    gold: null,
                                    silver: null,
                                    bronze: null,
                                    nonBoosted: nonBoost
                                });
                            }
                        });

                    } else if (result[i].package == 'silver' && silverCount < 2) {

                        //silver profiles
                        silverUser[k] = {
                            fname: result[i].FirstName,
                            lname: result[i].LastName,
                            email: result[i].email,
                            package: result[i].package,
                            location: '',
                            subject: '',
                            mobile: '',
                            rate: '',
                            imgUrl: '',
                            price: '',
                            available: ''

                        }
                        if (result[i].Location) {
                            silverUser[k].location = result[i].Location;
                        }
                        if (result[i].Mobile) {
                            silverUser[k].mobile = result[i].Mobile;
                        }
                        if (result[i].Subject) {
                            silverUser[k].subject = result[i].Subject;
                        }
                        if (result[i].Rate) {
                            silverUser[k].rate = result[i].Rate;
                        }
                        if (result[i].ImgUrl) {
                            silverUser[k].imgUrl = result[i].ImgUrl;
                        }
                        if (result[i].Price) {
                            silverUser[k].price = result[i].Price;
                        }
                        if (result[i].Available_time) {
                            silverUser[k].available = result[i].Available_time;
                        }

                        silverCount++;
                        k++;


                        var sql2 = "update ViewCount set hourlyReachCount = hourlyReachCount + 1 where tutor = '" + result[i].email + "'";
                        con.query(sql2, function (err) {
                            if (err) {
                                res.json({
                                    success: false,
                                    gold: null,
                                    silver: null,
                                    bronze: null,
                                    nonBoosted: nonBoost
                                });
                            }
                        });

                    } else if (result[i].package == 'bronze' && bronzeCount < 2) {

                        //bronze profiles
                        bronzeUser[l] = {
                            fname: result[i].FirstName,
                            lname: result[i].LastName,
                            email: result[i].email,
                            package: result[i].package,
                            location: '',
                            subject: '',
                            mobile: '',
                            rate: '',
                            imgUrl: '',
                            price: '',
                            available: ''

                        }
                        if (result[i].Location) {
                            bronzeUser[l].location = result[i].Location;
                        }
                        if (result[i].Mobile) {
                            bronzeUser[l].mobile = result[i].Mobile;
                        }
                        if (result[i].Subject) {
                            bronzeUser[l].subject = result[i].Subject;
                        }
                        if (result[i].Rate) {
                            bronzeUser[l].rate = result[i].Rate;
                        }
                        if (result[i].ImgUrl) {
                            bronzeUser[l].imgUrl = result[i].ImgUrl;
                        }
                        if (result[i].Price) {
                            bronzeUser[l].price = result[i].Price;
                        }
                        if (result[i].Available_time) {
                            bronzeUser[l].available = result[i].Available_time;
                        }

                        bronzeCount++;
                        l++;

                        var sql2 = "update ViewCount set hourlyReachCount = hourlyReachCount + 1 where tutor = '" + result[i].email + "'";
                        con.query(sql2, function (err) {
                            if (err) {
                                res.json({
                                    success: false,
                                    gold: null,
                                    silver: null,
                                    bronze: null,
                                    nonBoosted: nonBoost
                                });
                            }
                        });

                    }
                }
                res.json({
                    success: true,
                    gold: goldUser,
                    silver: silverUser,
                    bronze: bronzeUser,
                    nonBoosted: nonBoost

                });
            } else {
                res.json({
                    success: true,
                    gold: null,
                    silver: null,
                    bronze: null,
                    nonBoosted: nonBoost
                });
            }
        });
    });

});

module.exports = router; 