const express = require('express');
const passport = require('passport');
const request = require('request');
const keys = require('../../config/keys');
const user = require('../../config/passport-setup');
const con = require('../../databse/db');

const router = express.Router();

router.get('/class', passport.authenticate('googleClass', { 
    scope: ['email', 'https://www.googleapis.com/auth/classroom.courses']
    
}), (req, res) => {
        req.session.scope = req.user.scope;
        req.session.access_token = req.user.access_token;
        req.session.refresh_token = req.user.refresh_token;
        var scope = req.user.scope;
        var accessToken = req.user.access_token;
        var refreshToken = req.user.refresh_token;


    })

router.get('/class/courses', passport.authenticate('googleClass'), (req, res) => {
    request('https://classroom.googleapis.com/v1/courses', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        res.send(body)
    });
})

/* const Client = require('google-classroom');

const client = new Client({
    clientId: keys.googleClassroom.clientID,
    clientSecret: keys.googleClassroom.clientSecret,
    refreshToken: ''
})

client.on('ready', async classr => {
    client.getCourses()
        .then(data => {
            console.log(data)
        })
}) */

module.exports = router;