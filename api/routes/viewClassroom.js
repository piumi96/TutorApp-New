const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
const passport = require('passport');
const user = require('../../config/passport-setup');
const Client = require('google-classroom');
const keys = require('../../config/keys');

/* const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

router.get('/courses', (req, res) => {

    //action = 'viewCourse';

    const SCOPES = ['https://www.googleapis.com/auth/classroom.courses'];
    const TOKEN_PATH = 'token.json';

    
    fs.readFile('credentials.json', (err, content) => {
        if(err) return console.log('Error loading client secret file:', err);
        authorize(JSON.parse(content), createCourses);
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

    function createCourses(auth){
        const classroom = google.classroom({ version: 'v1', auth });
        var newCourse = {
            Name: 'abc',
            OwnerId: 'me',
            CourseState: 'PROVISIONED'
        }
    
        classroom.courses.create(newCourse, (err, result) => {
            if(err){
                console.log(err);
                res.json({
                    success: false,
                    displaycourse: null
                })
            }
            else{
                listCourses;
            }
        });
        
    
    }
}) */


router.get('/courses', passport.authenticate('googleClass', {
    scope: ['email', 'https://www.googleapis.com/auth/classroom.courses']
}), (req, res) => {
    req.session.access_token = req.user.access_token;
    var access_token = req.session.access_token;
    req.session.refresh_token = req.session.refresh_token;
    var refresh_token = req.session.resfresh_token;
    req.session.scope = req.user.scope;
    var email = req.session.scope;

    console.log(email.id_token);

    const client = new Client({
        clientId: keys.googleClassroom.clientID,
        clientSecret: keys.googleClassroom.clientSecret,
        refreshToken: email.id_token
    })

    console.log(client.getCourses());

    res.send("google classroom works");
})


module.exports = router; 