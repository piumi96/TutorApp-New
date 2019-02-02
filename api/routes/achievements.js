const express = require('express');
const router = express.Router();

const con = require('../../databse/db');

router.post('/addAchievement', (req, res) => {
    var tutor = req.body.tutor;
    var title = req.body.title;
    var description = req.body.description;
    var name = req.body.name;

    var sql = "insert into Achievements(tutor, title, description, name) values('"+tutor+"', '"+title+"', '"+description+"', '"+name+"')";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                achievements: null
            });
        }
        else{
            console.log(result);
            var sql1 = "select * from Achievements where tutor='"+tutor+"' order by achievementID";
            con.query(sql1, (err, response) => {
                if(err){
                    console.log(err);
                    res.json({
                        success: false,
                        achievements: null
                    })
                }
                else{
                    console.log(response);
                    var achievements = [];
                    for(var i=0; i<response.length; i++){
                        achievements[i] = {
                            id: response[i].achievementID,
                            title: response[i].title,
                            name: response[i].name,
                            ImgUrl: response[i].ImgUrl,
                            description: response[i].description,
                            hide: response[i].hideStatus
                        }
                    }
                    res.json({
                        success: true,
                        achievements: achievements,
                        id: achievements[response.length-1].id
                    });
                }
            })
            
        }
    })
});

router.post('/getAchievements', (req, res) => {
    var tutor = req.body.tutor;

    var sql = "select * from Achievements where tutor='"+tutor+"'";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                achievements: null
            });
        }
        else{
            var achievements = [];
            for(var i=0; i<result.length; i++){
                achievements[i] = {
                    id: result[i].achievementID,
                    title: result[i].title,
                    name: result[i].name,
                    ImgUrl: result[i].ImgUrl,
                    description: result[i].description,
                    hide: result[i].hideStatus
                }
            }
            console.log(result);
            res.json({
                success: true,
                achievements: achievements
            });
        }
    })
});

router.post('/deleteAchievement', (req, res) => {
    var id = req.body.id;
    var tutor = req.body.tutor;

    var sql = "delete from Achievements where achievementID='"+id+"'";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                achievements: null
            });
        }
        else{
            console.log(result);
            var sql1 = "select * from Achievements where tutor='" + tutor + "'";
            con.query(sql1, (err, response) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        achievements: null
                    })
                }
                else {
                    console.log(response);
                    var achievements = [];
                    for (var i = 0; i < response.length; i++) {
                        achievements[i] = {
                            id: response[i].achievementID,
                            title: response[i].title,
                            name: response[i].name,
                            ImgUrl: response[i].ImgUrl,
                            description: response[i].description,
                            hide: response[i].hideStatus
                        }
                    }
                    res.json({
                        success: true,
                        achievements: achievements
                    });
                }
            })
        }
    })
});

router.put('/editAchievement', (req, res) => {
    var tutor = req.body.tutor;
    var id = req.body.id;
    var title = req.body.title;
    var description = req.body.description;
    var name = req.body.name;
    var ImgUrl = req.bodyImgUrl;

    var sql = "update Achievements set title='"+title+"', description='"+description+"', name='"+name+"' where tutor='"+tutor+"' and achievementID='"+id+"'";
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false,
                achievements: null
            });
        }
        else{
            var sql1 = "select * from Achievements where tutor='" + tutor + "'";
            con.query(sql1, (err, response) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        achievements: null
                    })
                }
                else {
                    console.log(response);
                    var achievements = [];
                    for (var i = 0; i < response.length; i++) {
                        achievements[i] = {
                            id: response[i].achievementID,
                            title: response[i].title,
                            name: response[i].name,
                            ImgUrl: response[i].ImgUrl,
                            description: response[i].description, 
                            hide: response[i].hideStatus
                        }
                    }
                    res.json({
                        success: true,
                        achievements: achievements
                    });

                }
            })
        }
    });

});

router.post('/toggleAchievement', (req,res) => {
    var id = req.body.id;
    var hide = req.body.hide;

    if(hide == 0){
        var sql = "update Achievements set hideStatus='0' where achievementID='"+id+"'";
    }
    else if(hide == 1){
        var sql = "update Achievements set hideStatus='1' where achievementID='" + id + "'";
    }
    con.query(sql, (err, result) => {
        if(err){
            console.log(err);
            res.json({
                success: false
            });
        }
        console.log(result);
        res.json({
            success: true
        });
    });
});


module.exports = router;