import jwt from "jsonwebtoken";

const authMiddle = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(404).json({
      message: "Token not found. Please Login",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

export default authMiddle;