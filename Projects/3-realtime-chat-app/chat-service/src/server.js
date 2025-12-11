import express from "express";
import { Server } from "socket.io";
import http from 'http';
import dotenv from 'dotenv';
import initSocket from "./socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors : { origin : "*"},
})

initSocket(io);

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`Server of chat-service is up baby at port ${PORT}`);
})