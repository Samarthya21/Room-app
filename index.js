const express = require('express');
const path = require('path');
const { Server } = require("socket.io");
const serverless = require('serverless-http');

const app = express();

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Handle HTTP requests
app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Create an HTTP server and attach Socket.io
const server = require('http').createServer(app);
const io = new Server(server);

io.on('connection', (socket) => { 
    socket.on('user-message', (message) => {
        console.log('A new user message', message);
        io.emit('message', message);    
    });
});

// Export the serverless function
module.exports = app;
module.exports.handler = serverless(app);