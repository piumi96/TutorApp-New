const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
const schedule = require('node-schedule');

router.post('/insertNews', (req, res) => {
    var content = req.body.content;
    var title = req.body.title;

    var sql = "insert into NewsFeed(title, content, startDate, expiryDate) values('"+title+"', '" + content + "', CURRENT_TIMESTAMP(), TIMESTAMPADD(MONTH, 6, CURRENT_TIMESTAMP()))";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false
            })
        }
        else{
            res.json({
                success: true
            })
        }
    })
});

router.get('/getNews', (req, res) => {
    var sql = "select * from NewsFeed order by startDate desc";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                news: null
            });
        }
        else{
            console.log(result);
            var news = [];
            for(var i=0; i<result.length; i++){
                news[i] = {
                    id: result[i].newsID,
                    title: result[i].title,
                    content: result[i].content,
                    startDate: result[i].startDate,
                    expiryDate: result[i].expiryDate
                }
            }
            res.json({
                success: true,
                news: news
            });
        }
    })
});

module.exports = router;