const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const con = require('../../databse/db');

router.post('/addBoostOffer', (req, res) => {
    var package = req.body.package;
    var discount = req.body.discount;
    var duration = req.body.duration;

    var sql = "update BoostOffers set discount = '" + discount + "', duration='" + duration +"', startdate=CURRENT_TIMESTAMP(), expirydate=TIMESTAMPADD(DAY,"+duration+",CURRENT_TIMESTAMP()) where package = '"+ package+"'";
    var sql1 = "select price from BoostOffers where package='"+package+"'";

    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false
            });
        }
        con.query(sql1, (err, result) => {
            if(err){
                console.log(err);
                res.json({
                    success: false
                })
            }
            
            var oldPrice = result[0].price;
            console.log(oldPrice);
            var newPrice = oldPrice*(100-discount)/100;
            console.log(newPrice);

            var sql2 = "update BoostOffers set price = '"+newPrice+"' where package = '"+package+"'";
            
            con.query(sql2, (err, result) => {
                if(err){
                    console.log(err);
                    res.json({
                        success: false,
                        newPrice: null
                    })
                }
                console.log(result);
                res.json({
                    success: true,
                    newPrice: newPrice
                })
            })
        })

    })
});

router.post('/endBoostOffer', (req, res) => {
    var package = req.body.package;
    var sql = "select discount, price from BoostOffers where package = '"+package+"'";
    
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                newPrice: null
            });
        }
        console.log(result);
        var discount = result[0].discount;
        var oldPrice = result[0].price;
        
        var newPrice = (oldPrice*100)/(100-discount);
        console.log(newPrice);

        var sql1 = "update BoostOffers set price = '" + newPrice + "', discount = '0' where package = '" + package + "'";

        con.query(sql1, (err, result) => {
            if(err){
                console.log(err);
                res.json({
                    success: false,
                    newPrice: null
                });
            }
            //console.log(result);
            res.json({
                success: true,
                newPrice: newPrice
            })
        })

    })
})

function DailyCheckup(){
    var sql = "select * from BoostOffers where CURRENT_TIMESTAMP() > expirydate";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
        }
        else{
            for(var i=0; i< result.length; i++){
                var discount = result[i].discount;
                var oldPrice = result[i].price;
                var newPrice = (oldPrice * 100) / (100 - discount);

                var sql1 = "update BoostOffers set discount='0', price='"+newPrice+"' where package='"+result[i].package+"'";
                con.query(sql1, (err, response) => {
                    if(err) throw err;
                    console.log(response);
                })
            }
        }
    })
}

//schedule.scheduleJob('0 0 * * *', DailyCheckup);

module.exports = router;