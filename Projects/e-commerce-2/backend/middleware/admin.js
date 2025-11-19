

const admin = ( req, res, next ) => {
    if(!req.user) {
        return res.status(401).json({
            message : "Not Authenticated"
        })
    }
    if(req.user.role !== "admin") {
        return res.status(403).json({
            message : "You are not an admin"
        })
    }

    next();
}

export default admin;
