
    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth20');
    const keys = require('./keys');
    const con = require('../databse/db');
    
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    
    passport.use(
        new GoogleStrategy({
            //options for google strategy
            callbackURL: '/google-reg',
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        }, (accessToken, refreshToken, email, done) => {
            //passport callback function                
                done(null, {
                    email: email
                });     
        
        })
    )





 