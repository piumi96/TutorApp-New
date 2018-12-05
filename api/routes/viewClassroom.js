/* const express = require('express');
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

const express = require('express');
const router = express.Router();
const con = require('../../databse/db');

const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

router.get('/viewCourses', (req, res) => {
    const SCOPES = ['https://www.googleapis.com/auth/classroom.courses'];
    const TOKEN_PATH = 'token.json';
    fs.readFile('credentials.json', (err, content) => {
        if(err) return console.log('Error loading client secret file:', err);
        authorize(JSON.parse(content), listCourses);
    });
    
    function authorize(credentials, callback){
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]
        );
    
        fs.readFile(TOKEN_PATH, (err, token) => {
            if(err) return getNewToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }
    
    function getNewToken(oAuth2Client, callback){
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES,
        });
        console.log('Authorize this app by visiting this url:', authUrl);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter the code from that page here: ', (code) => {
            rl.close();
            oAuth2Client.getToken(code, (err, token) => {
                if(err) return console.error('Error retireving access token', err);
                oAuth2Client.setCredentials(token);
                fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                    if(err) console.error(err);
                    console.log('Token stored to', TOKEN_PATH);
                });
                callback(oAuth2Client);
    
            });
    
        });
    }
    
    function listCourses(auth){
        const classroom = google.classroom({ version: 'v1', auth});
        classroom.courses.list({
            pageSize: 10,
        }, (err, response) => {
            if(err) return console.error('The API returned an error: ' + err);
            const courses = response.data.courses;
            if(courses && courses.length){
                console.log('Courses:');
                courses.forEach((course) => {
                    console.log(`${course.name} (${course.id})`);
                });
                res.json({
                    success: true,
                    courses: courses
                })
            }
            else{
                console.log('No courses found');
                res.json({
                    success: false,
                    courses: null
                })
            }
        })
    }

})



module.exports = router; 