
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
    //var response = {};
    
    passport.use(
        new GoogleStrategy({
            //options for google strategy
            callbackURL: '/google-student',
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        }, (accessToken, refreshToken, email, done) => {
            //passport callback function
            
            user = {
                fname: email.name.givenName,
                lname: email.name.familyName,
                email: email.emails[0].value 
            };
            
            var has = false;
            var success = false;
    
            console.log(user.email);
            var sql = "insert into Student(name, email) values('" + user.fname + " " + user.lname + "', '" + user.email + "')"
            var sql1 = "select * from Student where email='" + user.email + "'";
    
            con.query(sql1, (err, result) => {
                if (err) throw err;
                else{
                if (result.length > 0) {
                    has = true;
                }
                else {
                    con.query(sql, function (err, result) {
                        if (err) {
                            success = false;
                        }
                        else {
                            success =  true;                  
                        }
                    });
                }}
                done(null, user);
                var res = {
                    has: has,
                    success: success
                }
                //console.log(pass);
               
            });  
    
        
        })
    )





 