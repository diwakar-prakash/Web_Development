import axios from "axios";

const dmEvents = (io, socket) => {
    socket.on("dm-send", ({ toUserId, text }) => {
        io.to(toUserId).emit("dm-receive", {
            from: socket.user.id,
            text,
        })

        axios.post(
            `${process.env.BASE}/messages/dm/${toUserId}`,
            {
                senderId: socket.user.id,
                receiverId: toUserId,
                text,
            }
        )
    })
}

export default dmEvents;