

const checkRole = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({
                message : "You are not meant for that role."
            })
        }

        next();
    }
}

export default checkRole;

