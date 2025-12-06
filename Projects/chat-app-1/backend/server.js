import { Server } from "socket.io";
import http from 'http';
import express from "express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin : "*"
    },
})

app.use(express.static("../frontend"));

io.on('connection', (socket) => {
    console.log("Welcome to the Chat Application. Your socket id is :", socket.id);

    socket.on("chat:message", (message) => {
        console.log(`The message from ${socket.id} is ${message}`);

        io.emit("chat:message", {
            id: socket.id,
            text: message,
            time: new Date().toISOString()
        })
    });

    socket.on("disconnect", () => {
        console.log(`The user with socket id ${socket.id} has been disconnected`);
    });
});

const PORT = process.env.PORT || 5002

server.listen(PORT, () => {
    console.log(`The Chat Server is running on the PORT ${PORT}`)
})



