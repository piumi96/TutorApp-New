const app = require('./app');
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

const io = require('socket.io')(http);

http.listen(port, () => {
    console.log("Server running");
}); 

io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log("Connected: %s sockets connected", connections.length);

    //Disconnection
    sockets.on('disconnect', (data) => {
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected: %s sockets connected", connections.length);
    });

    //Send message
    socket.on('send message', (data) => {
        io.sockets.emit('new message', {msg: data, user: socket.username});
    });  

    //New user
    socket.on('new user', (data, cb) => {
        cb(true);
        socket.username = data;
        user.push(socket.username);
        updateUsernames();
    });

    function updateUsernames(){
        io.sockets.emit('get users', users);
    }
});


