
const typingEvents = (io, socket) => {
    socket.on('typing', (room) => {
        socket.to(room).emit('typing', socket.user.username);
    });

    socket.on('stop-typing', (room) => {
        socket.to(room).emit('stop-typing', socket.user.username);
    })
}

export default typingEvents;