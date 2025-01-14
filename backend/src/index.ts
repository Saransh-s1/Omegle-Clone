import { Socket } from "socket.io";
import { Server } from "socket.io";
import express from 'express';
import http from "http";
import { UserManager } from "./managers/UserManger";



const app = express();
const server = http.createServer(http);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const userManager = new UserManager();

io.on('connection', (socket: Socket) => {
    console.log('a user connected');
    userManager.addUser("randomName",socket);
    socket.on("disconnect", () => {
        userManager.removeUser(socket.id);
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});