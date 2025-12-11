import jwt from 'jsonwebtoken';

const authSocket = (socket, next) => {
    const token = socket.handshake.auth?.token;

    if(!token) {
        console.log("No token provided");
        return next(new Error("Authentication Failed"));
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    }
    catch ( err ) {
        console.log("Invalid Token");
        next(new Error("Authentication Failed"));
    }
}

export default authSocket;