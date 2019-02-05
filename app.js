const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const schedule = require('node-schedule');

const con = require('./databse/db');
const keys = require('./config/keys');
const userRoutes = require('./api/routes/user');
const searchRoutes = require('./api/routes/search');
const reviewsRoute = require('./api/routes/review');
const rateRoute = require('./api/routes/rate');
const resetPassword = require('./api/routes/resetPassword');
const subjectRoutes = require('./api/routes/subject');
const requestRoutes = require('./api/routes/request');
const profileRoutes = require('./api/routes/profile');
const blockRoute = require('./api/routes/block');
const suggestionRoutes = require('./api/routes/suggestions');
const adminRoutes = require('./api/routes/admin');
const districtRoutes = require('./api/routes/district');
const classroomRoutes = require('./api/routes/classroom');
const tutorDashRoutes = require('./api/routes/tutorDash');
const achievementRoutes = require('./api/routes/achievements');
const imageUploadRoute = require('./api/routes/imageupload');
const emailVerifyRoute = require('./api/routes/emailVerify');
const chatRoute = require('./api/routes/chat');
const boostOfferRoutes = require('./api/routes/boostOffer');
const boostRoutes = require('./api/routes/boostProfile');
const newsFeedRoute = require('./api/routes/newsFeed');
const newSearchRoute = require('./api/routes/newsearch');
const passportSetup = require('./config/passport-setup');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

con.connect((err) => {
    if(err) throw err;
    else{
        console.log('Database connected');  
    }

});

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRoutes);
app.use('/', searchRoutes);
app.use('/', reviewsRoute);
app.use('/', rateRoute);
app.use('/', resetPassword);
app.use('/', subjectRoutes);
app.use('/', requestRoutes);
app.use('/', profileRoutes);
app.use('/', blockRoute);
app.use('/', suggestionRoutes);
app.use('/', adminRoutes);
app.use('/', districtRoutes);
app.use('/', classroomRoutes);
app.use('/', tutorDashRoutes);
app.use('/', achievementRoutes);
app.use('/', imageUploadRoute);
app.use('/', emailVerifyRoute);
app.use('/', chatRoute);
app.use('/', boostOfferRoutes);
app.use('/', boostRoutes);
app.use('/', newsFeedRoute);
app.use('/', newSearchRoute);

schedule.scheduleJob('59 * * * *', HourlyPriorityReduction);

function HourlyPriorityReduction() {
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

app.use((req, res, next)=>{
    const error = {
        message: 'Not found',
        status: 404
    };
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});  

module.exports = app;