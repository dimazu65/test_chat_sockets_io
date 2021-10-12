const express = require("express");
const socketio = require("socket.io");
const cors = require('cors');
const http = require("http");

const {addUser , removeUser , getUser , getUserInRoom} = require('./User');

const router = require("./router");

const Port = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app)
const io = socketio(server);

app.use(router);
app.use(cors());

io.on('connection' , (socket)=> {

    socket.on('join', ({name , room}, callBack)=>{
       const { error , user} = addUser({id:socket.id , name, room});

       if(error) return callBack(error);

       socket.emit('message' , {user:'admin' , text:`${user.name}, welcome to the room ${user.room}`});
       socket.broadcast.to(user.room).emit('message' ,{user:'admin' , text: `${user.name} has joined !`});

       socket.join(user.room);

       io.to(user.room).emit('roomData' , {room: user.room ,users: getUserInRoom(user.room)});

        callBack();
    });
    
   
   socket.on('sendMessage', (message,callBak) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {user:user.name , text: message});
    io.to(user.room).emit('roomData', {room:user.room , users: getUserInRoom(user.room)});
    callBak();
   });
   
   
    socket.on('disconnect' ,()=> {
        const user = removeUser(socket.id);

        if(user) {
            io.to(user.room).emit('message' , {user: 'admin' , text: `${user.name} has left!!`});
        }
    })
});



server.listen(Port , ()=> console.log(`Server is up on ${Port}`));