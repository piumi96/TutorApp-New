const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
const keys = require('../../config/keys');

const pusher = new Pusher({
    appId: keys.pusher.appId,
    key: keys.pusher.key,
    secret: keys.pusher.secret
});

router.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;

    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);

})

module.exports = router;