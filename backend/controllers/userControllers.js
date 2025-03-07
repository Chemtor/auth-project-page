const User = require('../models/User')

const getUserInfo = async (req, res) => {
    try {
        const userInfo = await User.findById(req.user.userId);
        if (!userInfo) {
            res.status(404).json({
                status: "error",
                code: "404",
                message: "User not found"
            })
        }

        res.json({
            id: userInfo._id,
            username: userInfo.username,
            email: userInfo.email,
            role: userInfo.role
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            code: "500",
            message: "Server error"
        })
    }
}

module.exports = {
    getUserInfo
}