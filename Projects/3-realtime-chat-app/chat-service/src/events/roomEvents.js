import axios from "axios";

const roomEvents = (io, socket) => {
    socket.on('join-room', async (room) => {
        socket.join(room);

        console.log(`${socket.user.username} joined into the room`);

        socket.to(room).emit("user-joined", socket.user.username);

        try {
            const res = await axios.get(`${process.env.BASE}/messages/room/${room}`);
            socket.emit('room-history', res.data.messages);
        } catch (err) {
            console.log("Failed fetching room history", err.message);
            socket.emit('room-history', []); 
        }

        
    });

    socket.on('room-message', async({ room, text }) => {
        const msg = {
            room,
            senderId: socket.user.id,
            username: socket.user.username,
            text,
        };

        io.to(room).emit('room-message', msg);

        await axios.post(
            `${process.env.BASE}/messages/room/${room}`, 
            msg
        );
    })
}

export default roomEvents;