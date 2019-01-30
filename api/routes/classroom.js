const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
const passport = require('passport');
const user = require('../../config/passport-setup');
const keys = require('../../config/keys');
const { google } = require('googleapis');
const Client = require('google-classroom');
const classroom = google.classroom({ version: 'v1' });

const fs = require('fs');
const readline = require('readline');
const SCOPES = ['https://www.googleapis.com/auth/classroom.courses', 'https://www.googleapis.com/auth/classroom.rosters', 'https://www.googleapis.com/auth/classroom.coursework.me', 'https://www.googleapis.com/auth/classroom.coursework.students'];
const TOKEN_PATH = 'googleToken.json';

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
        //getNewToken(oAuth2Client, callback);
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
};

var refresh = null;
router.get('/listCourses', (req, res) => {
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err){
            console.log(err);
            res.json({
                success:false
            });
        }
        else{
            refresh = JSON.parse(token).refresh_token;
            console.log(refresh);
        }
    });

    authorize(credentials, listCourses);
    function listCourses(){
        const client = new Client({
            clientId: keys.oauthClient.clientID,
            clientSecret: keys.oauthClient.clientSecret,
            refreshToken: refresh
        })
    
        client.on('ready', async classr => {
            client.getCourses()
                .then(data => {
                    res.json({
                        courses: data
                    });
                });
        });
    }

});

router.post('/createCourse', (req, res) => {
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            console.log(err);
            res.json({
                success: false
            });
        }
        else {
            refresh = JSON.parse(token).refresh_token;
            console.log(refresh);
        }
    });
    authorize(credentials, createCourses);

    function createCourses() {
        const client = new Client({
            clientId: keys.oauthClient.clientID,
            clientSecret: keys.oauthClient.clientSecret,
            refreshToken: refresh
        });
        var section = req.body.section;
        var name = req.body.name;

        client.on('ready', async classr => {
            client.createCourse(name, section)
                .then(data => {
                    res.json({
                        newCourse: data
                    });
                });
        });
    }
});

//cannot read property legth error????
//functions related to invitations cannot be run properly. 
router.get('/getInvitations', (req, res) => {
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            console.log(err);
            res.json({
                success: false
            });
        }
        else {
            refresh = JSON.parse(token).refresh_token;
            console.log(refresh);
        }
    });
    authorize(credentials, getInvitations);

    function getInvitations() {
        const client = new Client({
            clientId: keys.oauthClient.clientID,
            clientSecret: keys.oauthClient.clientSecret,
            refreshToken: refresh
        });
       
        client.on('ready', async classr => {
            client.getInvites()
                .then(data => {
                    console.log(data);
                });
        });
    }
})





module.exports = router;