const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'teaminsomniac16@gmail.com',
        pass: 'tutorapp123'
    }
});

module.exports = transporter;