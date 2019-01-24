const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
const passport = require('passport');
const user = require('../../config/passport-setup');
const keys = require('../../config/keys');
const { google } = require('googleapis');
const classroom = google.classroom({ version: 'v1' });

const fs = require('fs');
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses', 'https://www.googleapis.com/auth/classroom.rosters'];
const TOKEN_PATH = 'token.json';

const credentials = {
    client_secret: keys.oauthClient.clientSecret,
    client_id: keys.oauthClient.clientID,
    redirect_uris: ["urn:ietf:wg:oauth:2.0:oob", "http://localhost:3000/", "https://classroom.googleapis.com/v1/courses"]
};

function authorize(credentials, callback) {
    const client_secret = credentials.client_secret;
    const client_id = credentials.client_id;
    const redirect_uris = credentials.redirect_uris;

    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]
    );

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
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
            if (err) return console.error('Error retireving access token', err);
            oAuth2Client.setCredentials(token);
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);

        });

    });
}

router.get('/listCourses', (req, res) => {
    authorize(credentials, listCourses);

    function listCourses(auth) {
        const classroom = google.classroom({ version: 'v1', auth });
        classroom.courses.list({
            pageSize: 10,
        }, (err, response) => {
            if (err) return console.error('The API returned an error: ' + err);
            const courses = response.data.courses;
            if (courses && courses.length) {
                console.log('Courses:');
                courses.forEach((course) => {
                    console.log(`${course.name} (${course.id})`);
                });
                //console.log(response);
                res.json({
                    success: true,
                    courses: courses
                })
            }
            else {
                console.log('No courses found');
                res.json({
                    success: false,
                    courses: null
                })
            }
        })
    }
});

router.post('/createCourse', (req, res) => {
    authorize(credentials, createCourses);
    
    function createCourses(auth) {
/*         var newCourse = {
            'name': '',
            'ownerId': ''
        }; 
        console.log(newCourse); */
        const classroom = google.classroom({ version: 'v1', auth });
        
        classroom.courses.create({
            ownerId: req.body.newCourse.ownerId,
            name: req.body.newCourse.name
        }, (err, response) => {
            
            if(err){
                console.log(err);
                res.json({
                    success: false,
                    newCourse: null
                })
            }
            else{
                console.log(response);
                res.send("Creating a course");
            }
        });
    }

})

router.get('/getCourse', (req, res) => {
    var id = req.body.id;
    //var id = '16353445529';
    authorize(credentials, getCourse);

    function getCourse(auth){
        const classroom = google.classroom({ version: 'v1', auth });
        classroom.courses.get({
            id: id,
        }, (err, response) => {
            if(err){
                console.log(err);
                res.json({
                    success: false,
                    course: null
                });
            }
            //console.log(response.data);
            const course = response.data
            res.json({
                success: true,
                course: course,
            })
        });
    }
});

router.get('/courseStudents', (req, res) => {
    var courseId = req.body.courseId;
    authorize(credentials, listStudents);

    function listStudents(auth){
        const classroom = google.classroom({ version: 'v1', auth });
        classroom.courses.students.list({
            courseId: courseId,
            pageSize: 10
        }, (err, response) => {
            
        })
    }
})





module.exports = router;