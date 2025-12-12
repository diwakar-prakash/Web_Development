import axios from "axios";

const dmEvents = (io, socket) => {

    socket.on('dm-load-history', async({ toUserId }) => {
        try {
            const res = await axios.get(
                `${process.env.BASE}/messages/dm/${socket.user.id}/${toUserId}`
            );

            socket.emit("dm-history", res.data.messages);
        }
        catch ( err ) {
            console.log("DM history finding failed: ", err.message);
        }
    })

    socket.on("dm-send", async({ toUserId, text }) => {
        io.to(toUserId).emit("dm-receive", {
            from: socket.user.id,
            username: socket.user.username,
            text
        })

        try {
            await axios.post(
            `${process.env.BASE}/messages/dm/${toUserId}`,
            {
                senderId: socket.user.id,
                receiverId: toUserId,
                text,
            }
        )
        }
        catch ( err ) {
            console.log("DM saving the message failed", err.message);
        }
    });
};


export default dmEvents;