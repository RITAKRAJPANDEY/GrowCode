import http from 'http';
import {Server,Socket} from 'socket.io';

// create a seperate http server
const httpServer = http.createServer();

// mount the websocket to it for initial handshake as well decoupling 
const io = new Server(httpServer,{
    cors:{
        origin:"http://localhost:3001",
        methods:['GET','POST'],
    }
})

// start the server connection
io.on('connection',(socket:Socket)=>{
    console.log(`User connected to id ${socket.id}`);

    socket.on('join_room',(roomId)=>{
        socket.join(roomId);
        // joins the user to the roomId
    });
    
    socket.on('send_message',(data)=>{
        socket.to(data.roomId).emit('recieve_message',data.message);
    });

    socket.on('disconnect',()=>{})

});

const port = Number(process.env.SOCKET_PORT)||3001;

httpServer.listen(port,()=>{
    console.log(`Socket running  on port ${port}`);
})