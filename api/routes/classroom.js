const express = require('express');
const router = express.Router();
const con = require('../../databse/db');
const keys = require('../../config/keys');
const { google } = require('googleapis');
const Client = require('google-classroom');

const SCOPES = ['https://www.googleapis.com/auth/classroom.courses', 'https://www.googleapis.com/auth/classroom.rosters', 'https://www.googleapis.com/auth/classroom.coursework.me', 'https://www.googleapis.com/auth/classroom.coursework.students'];
var refresh = null;

const credentials = {
    client_secret: keys.oauthClient.clientSecret,
    client_id: keys.oauthClient.clientID,
    redirect_uris: ["urn:ietf:wg:oauth:2.0:oob", "http://localhost:3000/", "https://classroom.googleapis.com/v1/courses"]
};

function authorize(credentials) {
    const client_secret = credentials.client_secret;
    const client_id = credentials.client_id;
    const redirect_uris = credentials.redirect_uris;

    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]
    );
    
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: SCOPES,
    });

    return authUrl;
}

router.get('/auth', (req, res) => {
    var authUrl = authorize(credentials);
    console.log(authUrl);
    res.json({
        url: authUrl
    });
    
})

router.post('/listCourses', (req, res) => {
    var code = req.body.token;
    if(code != "null"){
        const client_secret = credentials.client_secret;
        const client_id = credentials.client_id;
        const redirect_uris = credentials.redirect_uris;

        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]
        );

        oAuth2Client.getToken(code, (err, token) => {
            if(err){
                console.log(err);
                res.json({
                    success: false,
                    msg: "error fetching access token"
                });
            }
            else{
                console.log(token);
                refresh = token.refresh_token;
                
                const client = new Client({
                    clientId: keys.oauthClient.clientID,
                    clientSecret: keys.oauthClient.clientSecret,
                    refreshToken: refresh
                })

                client.on('ready', async classr => {
                    client.getCourses()
                        .then(data => {
                            res.json({
                                success: true,
                                courses: data
                            });
                        });
                });
            }
        })
    }
    else{
        res.json({
            success: false,
            courses: null
        })
    }
});

router.post('/createCourse', (req, res) => {
    var code = req.body.token;
    var section = req.body.section;
    var name = req.body.name;

    if (code != "null") {
        const client_secret = credentials.client_secret;
        const client_id = credentials.client_id;
        const redirect_uris = credentials.redirect_uris;

        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]
        );

        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "error fetching access token"
                });
            }
            else {
                console.log(token);
                refresh = token.refresh_token;

                const client = new Client({
                    clientId: keys.oauthClient.clientID,
                    clientSecret: keys.oauthClient.clientSecret,
                    refreshToken: refresh
                })
                
                client.on('ready', async classr => {
                    client.createCourse(name, section)
                        .then(data => {
                            res.json({
                                success: true,
                                newCourse: data
                            });
                        });
                });
                
            }
        })
    }
    else {
        res.json({
            success: false,
            newCourse: null
        })
    }
});

router.post('/listInvites', (req, res) => {
    var code = req.body.token;
    if (code != "null") {
        const client_secret = credentials.client_secret;
        const client_id = credentials.client_id;
        const redirect_uris = credentials.redirect_uris;

        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]
        );

        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "error fetching access token"
                });
            }
            else {
                console.log(token);
                refresh = token.refresh_token;
                var access = token.access_token;

                const classroom = google.classroom({ version: 'v1', oAuth2Client});
                classroom.invitations.list({
                    userId: 'me'
                }, (err, response) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            invites: null
                        });
                    }
                    else {
                        console.log(response);
                        res.json({
                            success: true,
                            invites: response.data
                        })
                    }
                })

            }
        })
    }
    else{
        var authUrl = authorize(credentials);
        console.log(authUrl);
        res.json({
            url: authUrl
        });
    }
});

//teachers of a course
router.post('/listTeachers', (req, res) => {
    var code = req.body.token;
    var courseId = req.body.courseId;

    if (code != "null") {
        const client_secret = credentials.client_secret;
        const client_id = credentials.client_id;
        const redirect_uris = credentials.redirect_uris;

        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]
        );

        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "error fetching access token"
                });
            }
            else {
                console.log(token);
                refresh = token.refresh_token;

                const classroom = google.classroom({ version: 'v1', oAuth2Client });
                classroom.courses.teachers.list({
                    courseId: courseId
                }, (err, response) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            teachers: null
                        })
                    }
                    else {
                        console.log(response.data.teachers[0].profile);
                        res.json({
                            success: true,
                            teachers: response.data.teachers
                        })
                    }
                })

            }
        })
    }
    else {
        var authUrl = authorize(credentials);
        console.log(authUrl);
        res.json({
            url: authUrl
        });
    }
});

//students of a course
router.post('/listStudents', (req, res) => {
    var code = req.body.token;
    var courseId = req.body.courseId;

    if (code != "null") {
        const client_secret = credentials.client_secret;
        const client_id = credentials.client_id;
        const redirect_uris = credentials.redirect_uris;

        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]
        );

        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "error fetching access token"
                });
            }
            else {
                console.log(token);
                refresh = token.refresh_token;

                const classroom = google.classroom({ version: 'v1', oAuth2Client });
                classroom.courses.students.list({
                    courseId: courseId
                }, (err, response) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            students: null
                        })
                    }
                    else {
                        console.log(response);
                        res.json({
                            success: true,
                            students: response.data.students
                        })
                    }
                })

            }
        })
    }
    else {
        var authUrl = authorize(credentials);
        console.log(authUrl);
        res.json({
            url: authUrl
        });
    }
});

//courseWork
router.post('/listCourseWork', (req, res) => {
    var code = req.body.token;
    var courseId = req.body.courseId;

    if (code != "null") {
        const client_secret = credentials.client_secret;
        const client_id = credentials.client_id;
        const redirect_uris = credentials.redirect_uris;

        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]
        );

        oAuth2Client.getToken(code, (err, token) => {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    msg: "error fetching access token"
                });
            }
            else {
                console.log(token);
                refresh = token.refresh_token;

                const classroom = google.classroom({ version: 'v1', oAuth2Client });
                classroom.courses.courseWork.list({
                    courseId: courseId,
                }, (err, response) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            courseWork: null
                        })
                    }
                    else {
                        console.log(response.data);
                        res.json({
                            success: true,
                            courseWork: response.data
                        });
                    }
                })

            }
        })
    }
    else {
        var authUrl = authorize(credentials);
        console.log(authUrl);
        res.json({
            url: authUrl
        });
    }
});

/* router.post('/acceptInvite', (req, res) => {
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
    authorize(credentials, acceptInvite);

    function acceptInvite() {
        var id = req.body.invitationId;
        const client = new Client({
            clientId: keys.oauthClient.clientID,
            clientSecret: keys.oauthClient.clientSecret,
            refreshToken: refresh
        });

        client.on('ready', async classr => {
            client.acceptInvitation(id)
                .then(data => {
                    console.log(data);
                });
        });
    }
}); */

//invalid json payload???
/* router.post('/sendInvite', (req, res) => {
    authorize(credentials, sendInvite);

    function sendInvite(auth){
        var invite = req.body.invite;
        const classroom = google.classroom({ version: 'v1', auth });
        classroom.invitations.create((invite), (err, response) => {
            if(err){
                console.log(err);
                res.json({
                    success: false
                });
            }
            else{
                console.log(response);
                res.json({
                    success: true
                })
            }
        })
    }
}) */


module.exports = router;