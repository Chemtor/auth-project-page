const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            res.status(401).json({
                status: "error",
                message: "Token not found"
            })
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: "Invalid token"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "failed",
            code: "500",
            message: "Authenticate failed"
        })
    }
}

module.exports = {
    authenticate
}

