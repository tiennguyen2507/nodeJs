const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization')
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.json({
                success: false,
                message: "không tìm thấy access token"
            })
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userID = decoded.userID
        console.log(req.userID)
        next()
    } catch (err) {
        return res.json({
            success: false,
            message: "token không chính xác"
        })
    }
}

module.exports = verifyToken