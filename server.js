const app = require('./app');
const http = require('http').createServer(app);

const port = process.env.PORT || 3000;

http.listen(port, () => {
    console.log("Server running");
}); 

