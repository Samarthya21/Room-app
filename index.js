const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);

// all the streams are handled by socket.io
const io = new Server(server);

io.on('connection', (socket) => { 
    socket.on('user-message', (message) => {
        console.log('A new user message', message);
        io.emit('message', message);    
    });
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Handle HTTP requests
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(3000, () => {
    console.log("Server started at port 3000");
});
