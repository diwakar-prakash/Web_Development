
const checkRole = (...roles) => ( req , res , next ) => {
    if(!req.user) {
        return res.status(401).json({
            message : "Unauthenticated, No token found"
        })
    }

    if(!roles.includes(req.user.role)) {
        return res.status(403).json({
            message : "You are not meant for that role"
        })
    }

    next();
}

export default checkRole;