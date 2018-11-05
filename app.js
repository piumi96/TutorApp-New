const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

const con = require('./databse/db');
const keys = require('./config/keys');
const userRoutes = require('./api/routes/user');
const profileEdit = require('./api/routes/profileEdit');
const searchRoutes = require('./api/routes/search');
const reviews = require('./api/routes/review');
const passportSetup = require('./config/passport-setup');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://guarded-beyond-19031.herokuapp.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extends: false }));
app.use(bodyParser.json());

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
app.use('/', profileEdit);
app.use('/', searchRoutes);
app.use('/', reviews);

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