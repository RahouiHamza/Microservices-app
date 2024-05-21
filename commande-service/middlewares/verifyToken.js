const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: "invalid token" });
        }
    } else {
        res.status(401).json({ message: "no token provided" });
    }
}


module.exports = verifyToken;

