const express = require('express');
const router = express.Router();
const google = require('googleapis');

const scopes = ['https://www.googleapis.com/auth/classroom.courses'];
//const tokenPath = 'token.json';
const keys = require('../../config/keys');
const googleClass = keys.googleClassroom;
const clientID = googleClass.clientID;
const clientSecret = googleClass.clientSecret;
const callback = "http://localhost:3000";

router.get('/class', (req, res) =>{
    console.log(googleClass);
    authorize(JSON.parse(googleClass), listCourses);
    console.log(listCourses);

    function authorize(googleClass) {
        const oAuth2Client = new google.auth.OAuth2(
            clientID, clientSecret, callback);
      
        // Check if we have previously stored a token.
        /* fs.readFile(TOKEN_PATH, (err, token) => {
          if (err) return getNewToken(oAuth2Client, callback);
          oAuth2Client.setCredentials(JSON.parse(token));
          callback(oAuth2Client);
        });*/
      } 

    res.send('works');
});

module.exports = router;