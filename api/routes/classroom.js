const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
const passport = require('passport');
const user = require('../../config/passport-setup');
const refresh = require('passport-oauth2-refresh');
const keys = require('../../config/keys');
const Client = require('google-classroom');

router.get('/courses', passport.authenticate('googleClass', {
    scope: ['https://www.googleapis.com/auth/classroom.courses.readonly', 'email'], 
    accessType: 'offline', promtp: 'consent'
}), (req, res) => {
    req.session.access_token = req.user.access_token;
    var access_token = req.session.access_token;
    req.session.refresh_token = req.session.refresh_token;
    var refresh_token = req.session.resfresh_token;
    req.session.scope = req.user.email;
    var email = req.session.email;

    //console.log(refresh_token);

    /* const client = new Client({
        clientId: keys.googleClassroom.clientID,
        clientSecret: keys.googleClassroom.clientSecret,
        refreshToken: refresh_token
    })

    console.log(client.getCourses()); */

    res.send('Callback google classroom reached');
})

module.exports = router;