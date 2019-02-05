const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

router.post('/search', (req, res) => {
    var district = req.body.district;
    var subject = req.body.subject;

    if (district === "all" && subject == "all") {
        var sql = "select Tutor.*, ProfileBoost.package from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where acc_status='1' order by Tutor.priority desc";
    }
    else if (subject == "all" && district != "all") {
        var sql = "select Tutor.*, ProfileBoost.package from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where Location like '%" + district + "%' AND acc_status='1' order by Tutor.priority desc";
    }
    else if (district == "all" && subject != "all") {
        var sql = "select Tutor.*, ProfileBoost.package from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where Subject like '%" + subject + "%' AND acc_status='1' order by Tutor.priority desc";
    }
    else if (subject != "all" && district != "all") {
        var sql = "select Tutor.*, ProfileBoost.package from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where Location like '%" + district + "%' AND Subject like '%" + subject + "%' AND acc_status='1' order by Tutor.priority desc";
    }

    con.query(sql, function (err, result) {
        if (err) {
            res.json({
                success: false,
                user: null
            });
        }
        else {

            var user = [];
            var goldCount, silverCount, bronzeCount;
            goldCount = silverCount = bronzeCount = 1;
            var j = 0;

            for (var i = 0; i < result.length; i++) {
                var sql2 = "update ViewCount set hourlyReachCount = hourlyReachCount + 1 where tutor = '" + result[i].email + "'";
                // console.log(result[i].package);

                if (result[i].package == 'gold' && goldCount < 4) {

                    //Gold profiles
                    user[j] = {
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
                        user[j].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[j].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[j].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[j].rate = result[i].Rate;
                    }
                    if (result[i].ImgUrl) {
                        user[j].imgUrl = result[i].ImgUrl;
                    }
                    if (result[i].Price) {
                        user[j].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[j].available = result[i].Available_time;
                    }
                    goldCount++;
                    j++;

                    con.query(sql2, function (err) {
                        if (err) {
                            res.json({
                                success: false
                            });
                        }
                    });

                } else if (result[i].package == 'silver' && silverCount < 3) {

                    //Silver profiles
                    user[j] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        email: result[i].email,
                        package: result[i],
                        location: '',
                        subject: '',
                        mobile: '',
                        rate: '',
                        imgUrl: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        user[j].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[j].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[j].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[j].rate = result[i].Rate;
                    }
                    if (result[i].ImgUrl) {
                        user[j].imgUrl = result[i].ImgUrl;
                    }
                    if (result[i].Price) {
                        user[j].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[j].available = result[i].Available_time;
                    }

                    silverCount++;
                    j++;

                    con.query(sql2, function (err) {
                        if (err) {
                            res.json({
                                success: false
                            });
                        }
                    });

                } else if (result[i].package == 'bronze' && bronzeCount < 2) {

                    //bronze profiles
                    user[j] = {
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
                        user[j].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[j].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[j].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[j].rate = result[i].Rate;
                    }
                    if (result[i].ImgUrl) {
                        user[j].imgUrl = result[i].ImgUrl;
                    }
                    if (result[i].Price) {
                        user[j].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[j].available = result[i].Available_time;
                    }

                    bronzeCount++;
                    j++;

                    con.query(sql2, function (err) {
                        if (err) {
                            res.json({
                                success: false
                            });
                        }

                    });

                } else if (result[i].package != 'gold' && result[i].package != 'silver' && result[i].package != 'bronze') {

                    user[j] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        email: result[i].email,
                        package: 'null',
                        location: '',
                        subject: '',
                        mobile: '',
                        rate: '',
                        imgUrl: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        user[j].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[j].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[j].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[j].rate = result[i].Rate;
                    }
                    if (result[i].ImgUrl) {
                        user[j].imgUrl = result[i].ImgUrl;
                    }
                    if (result[i].Price) {
                        user[j].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[j].available = result[i].Available_time;
                    }
                    j++;
                }
            }
            res.json({
                success: true,
                user: user
            });
        }
    });
});

router.post('/searchByName', (req, res) => {
    var name = req.body.name;
    var fname = (name.trim().split(/\s+/))[0];
    var lname = (name.trim().split(/\s+/))[1];
    var sql = "select * from Tutor where (FirstName like '%" + fname + "%' OR LastName like '%" + lname + "%') AND acc_status='1'";
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                user: null
            });
        }
        //console.log(result);
        var user = [];
        for (var i = 0; i < result.length; i++) {
            user[i] = {
                fname: result[i].FirstName,
                lname: result[i].LastName,
                email: result[i].email,
                location: '',
                subject: '',
                mobile: '',
                rate: '',
                imgUrl: '',
                price: '',
                available: ''

            }
            if (result[i].Location) {
                user[i].location = result[i].Location;
            }
            if (result[i].Mobile) {
                user[i].mobile = result[i].Mobile;
            }
            if (result[i].Subject) {
                user[i].subject = result[i].Subject;
            }
            if (result[i].Rate) {
                user[i].rate = result[i].Rate;
            }
            if (result[i].ImgUrl) {
                user[i].imgUrl = result[i].ImgUrl;
            }
            if (result[i].Price) {
                user[i].price = result[i].Price;
            }
            if (result[i].Available_time) {
                user[i].available = result[i].Available_time;
            }

        }
        res.json({
            success: true,
            user: user
        });
    });
});

router.post('/searchByName', (req, res) => {
    var name = req.body.name;
    var fname = (name.trim().split(/\s+/))[0];
    var lname = (name.trim().split(/\s+/))[1];
    var sql = "select * from Tutor where (FirstName like '%" + fname + "%' OR LastName like '%" + lname + "%') AND acc_status='1'";
    con.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                user: []
            });
        }
        //console.log(result);
        var user = [];
        for (var i = 0; i < result.length; i++) {
            user[i] = {
                fname: result[i].FirstName,
                lname: result[i].LastName,
                email: result[i].email,
                location: '',
                subject: '',
                mobile: '',
                rate: '',
                imgUrl: '',
                price: '',
                available: ''

            }
            if (result[i].Location) {
                user[i].location = result[i].Location;
            }
            if (result[i].Mobile) {
                user[i].mobile = result[i].Mobile;
            }
            if (result[i].Subject) {
                user[i].subject = result[i].Subject;
            }
            if (result[i].Rate) {
                user[i].rate = result[i].Rate;
            }
            if (result[i].ImgUrl) {
                user[i].imgUrl = result[i].ImgUrl;
            }
            if (result[i].Price) {
                user[i].price = result[i].Price;
            }
            if (result[i].Available_time) {
                user[i].available = result[i].Available_time;
            }

        }
        res.json({
            success: true,
            user: user
        });
    });
})



module.exports = router;

/* router.post('/search', (req, res) => {
    var district = req.body.district;
    var subject = req.body.subject;

    if (district === "all" && subject == "all") {
        var sql = "select Tutor.*, ProfileBoost.package, ProfileBoost.boostPriority from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where acc_status='1' order by ProfileBoost.boostPriority desc";
    }
    else if (subject == "all" && district != "all") {
        var sql = "select Tutor.*, ProfileBoost.package, ProfileBoost.boostPriority from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where Location like '%" + district + "%' AND acc_status='1' order by ProfileBoost.boostPriority desc";
    }
    else if (district == "all" && subject != "all") {
        var sql = "select Tutor.*, ProfileBoost.package, ProfileBoost.boostPriority from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where Subject like '%" + subject + "%' AND acc_status='1' order by ProfileBoost.boostPriority desc";
    }
    else if (subject != "all" && district != "all") {
        var sql = "select Tutor.*, ProfileBoost.package, ProfileBoost.boostPriority from Tutor LEFT JOIN ProfileBoost on Tutor.email=ProfileBoost.email where Location like '%" + district + "%' AND Subject like '%" + subject + "%' AND acc_status='1' order by ProfileBoost.boostPriority desc";
    }

    con.query(sql, function (err, result) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                user: null
            });
        }
        else {

            var user = [];
            var platinumCount, goldCount, silverCount;
            platinumCount = goldCount = silverCount = 1;
            var j = 0;

            for (var i = 0; i < result.length; i++) {
                var sql2 = "update ProfileBoost set boostPriority = boostPriority-1 where email='" + result[i].email + "'";
                // console.log(result[i].package);

                //change count to 4 ///////////////
                if (result[i].package == 'platinum' && platinumCount < 2) {

                    // platinum profiles
                    user[j] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        email: result[i].email,
                        package: 'platinum',
                        location: '',
                        subject: '',
                        mobile: '',
                        rate: '',
                        imgUrl: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        user[j].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[j].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[j].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[j].rate = result[i].Rate;
                    }
                    if (result[i].ImgUrl) {
                        user[j].imgUrl = result[i].ImgUrl;
                    }
                    if (result[i].Price) {
                        user[j].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[j].available = result[i].Available_time;
                    }
                    platinumCount++;
                    j++;

                    con.query(sql2, function (err) {
                        if (err) throw err;
                    });

                } else if (result[i].package == 'gold' && goldCount < 3) {

                    //Gold profiles
                    user[j] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        email: result[i].email,
                        package: 'gold',
                        location: '',
                        subject: '',
                        mobile: '',
                        rate: '',
                        imgUrl: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        user[j].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[j].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[j].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[j].rate = result[i].Rate;
                    }
                    if (result[i].ImgUrl) {
                        user[j].imgUrl = result[i].ImgUrl;
                    }
                    if (result[i].Price) {
                        user[j].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[j].available = result[i].Available_time;
                    }

                    goldCount++;
                    j++;

                    con.query(sql2, function (err, result) {
                        if (err) throw err;
                    });

                } else if (result[i].package == 'silver' && silverCount < 2) {

                    //silver profiles
                    user[j] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        email: result[i].email,
                        package: 'silver',
                        location: '',
                        subject: '',
                        mobile: '',
                        rate: '',
                        imgUrl: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        user[j].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[j].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[j].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[j].rate = result[i].Rate;
                    }
                    if (result[i].ImgUrl) {
                        user[j].imgUrl = result[i].ImgUrl;
                    }
                    if (result[i].Price) {
                        user[j].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[j].available = result[i].Available_time;
                    }

                    silverCount++;
                    j++;

                    con.query(sql2, function (err, result) {
                        if (err) throw err;
                    });

                } else if (result[i].package != 'platinum' && result[i].package != 'gold' && result[i].package != 'silver') {

                    user[j] = {
                        fname: result[i].FirstName,
                        lname: result[i].LastName,
                        email: result[i].email,
                        package: 'null',
                        location: '',
                        subject: '',
                        mobile: '',
                        rate: '',
                        imgUrl: '',
                        price: '',
                        available: ''

                    }
                    if (result[i].Location) {
                        user[j].location = result[i].Location;
                    }
                    if (result[i].Mobile) {
                        user[j].mobile = result[i].Mobile;
                    }
                    if (result[i].Subject) {
                        user[j].subject = result[i].Subject;
                    }
                    if (result[i].Rate) {
                        user[j].rate = result[i].Rate;
                    }
                    if (result[i].ImgUrl) {
                        user[j].imgUrl = result[i].ImgUrl;
                    }
                    if (result[i].Price) {
                        user[j].price = result[i].Price;
                    }
                    if (result[i].Available_time) {
                        user[j].available = result[i].Available_time;
                    }
                    j++;
                }
            }
            res.json({
                success: true,
                user: user
            });
        }
    });
});

 */




