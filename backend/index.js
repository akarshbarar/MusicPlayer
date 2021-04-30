const http = require('http');
const express = require('express');
const socketio = require('socket.io');



const app = express();
const server = http.createServer(app);
const io = socketio(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
});

io.on('connection', (socket) => {
  
    console.log("connection");

    socket.on('play',playMsg=>{
        console.log("Inside Play")
        io.emit('play',playMsg);
    });

    socket.on('stop',msg=>{
        io.emit("stop")
    })
});

server.listen( 5000, () => 
    console.log(`Server has started.`));