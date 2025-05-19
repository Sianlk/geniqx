const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', socket => {
    console.log('User connected:', socket.id);
    socket.on('signal', data => {
        io.to(data.to).emit('signal', data);
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(5001, () => console.log('VOXEL Signaling server running'));
