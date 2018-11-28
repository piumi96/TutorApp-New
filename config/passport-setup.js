
    const passport = require('passport');
    const GoogleStrategy = require('passport-google-oauth20');
    const FacebookStrategy = require('passport-facebook');
    const keys = require('./keys');
    const con = require('../databse/db');
    
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    
    passport.use('google',
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
    );

    passport.use('google-login',
        new GoogleStrategy({
             //options for google strategy
             callbackURL: '/google-login',
             clientID: keys.google.clientID,
             clientSecret: keys.google.clientSecret
         }, (accessToken, refreshToken, email, done) => {
             //passport callback function                
                 done(null, {
                     email: email
                 });     
         
         })
    );


    passport.use('facebook',
      new FacebookStrategy({
        callbackURL: '/facebook-reg',
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        profileFields: ['email', 'first_name', 'last_name']
      }, (accessToken, refreshToken, email, done) => {
              
            done(null, {
               email: email,
        
            });     
      })
    );

    passport.use('facebook-login',
       new FacebookStrategy({
         callbackURL: '/facebook-login',
         clientID: keys.facebook.clientID,
         clientSecret: keys.facebook.clientSecret,
         profileFields: ['email']
       }, (accessToken, refreshToken, email, done) => {
                      
             done(null, {
                 email: email
             });     
       })
    );

passport.use('googleClass',
    new GoogleStrategy({
        callbackURL: '/class/courses',
        clientID: keys.googleClassroom.clientID,
        clientSecret: keys.googleClassroom.clientSecret

    }, (accessToken, refreshToken, email, courses, done) => {
        console.log(email);
        console.log(" ");
       // console.log(courses);
        
        var access_token = accessToken;
        var refresh_token = refreshToken;

        done(null, {
            scope: email,
            access_token: access_token,
            refresh_token: refresh_token
        });
    })
)



 