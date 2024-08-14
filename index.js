const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);

//all the streams is handled by socket.io
const io = new Server(server);

io.on('connection', (socket) => { 
    socket.on('user-message', (message) => {
        console.log('A new user message', message);
        io.emit('message', message);    
    });
    
    
});
app.use(express.static(path.resolve('./public')));

//http request handles by express 
app.get('/', (req, res) => { 
    return res.sendFile('/public/index.html');
});
server.listen(3000, () => {
    console.log("Server started at port 3000");
});