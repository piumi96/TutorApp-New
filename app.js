const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

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