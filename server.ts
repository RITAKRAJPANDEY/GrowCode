import http from 'http';
import {Server,Socket} from 'socket.io';

// create a seperate http server
const httpServer = http.createServer();

// mount the websocket to it for initial handshake as well decoupling 
const io = new Server(httpServer,{
    cors:{
        origin:["http://localhost:3000","http://127.0.0.1:3000"],
        methods:['GET','POST'],
    }
})

// start the server connection
io.on('connection',(socket:Socket)=>{
    console.log(`User connected to id ${socket.id}`);

    socket.on('join_room',(roomId:string)=>{
        socket.join(roomId);
        console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('send_message',(data:{roomId:string; message:string})=>{
        socket.to(data.roomId).emit('receive_message', {
            roomId: data.roomId,
            message: data.message,
            senderId: socket.id,
        });
    });

    socket.on('disconnect',()=>{
        console.log(`User disconnected ${socket.id}`);
    });

});

const port = Number(process.env.SOCKET_PORT)||3001;

httpServer.listen(port,()=>{
    console.log(`Socket running  on port ${port}`);
})