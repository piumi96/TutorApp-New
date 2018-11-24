const express = require('express');
const passport = require('passport');
const user = require('../../config/passport-setup');
const con = require('../../databse/db');

const router = express.Router();

router.get('/class', passport.authenticate('googleClass', { 
    scope: ['email', 'https://www.googleapis.com/auth/classroom.courses']
    
})/* , (req, res) => {
        req.session.scope = req.user.scope;
        var scope = req.user.scope;
        res.send(scope);
    } */);

router.get('/class/v1/courses', passport.authenticate('googleClass'), (req, res) => {
    console.log("classroom redirect");
    res.send(passport.authenticate('googleClass'));
})

module.exports = router;