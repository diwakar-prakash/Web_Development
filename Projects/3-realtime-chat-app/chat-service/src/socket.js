
import authSocket from "./middleware/authSocket.js";



const initSocket = (io) => {
    io.use(authSocket);

    io.on("connection", (socket) => {
        console.log(`User has been connected ${socket.user.username}`);

        roomEvents(io, socket);
        dmEvents(io, socket);
        typingEvents(io, socket);

        socket.on("disconnect", () => {
            console.log(`User ${socket.user.username} disconnected`);
        })
    })
}

export default initSocket;