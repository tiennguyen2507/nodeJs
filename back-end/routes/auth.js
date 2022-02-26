require('dotenv').config()
const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')



const users = require('../model/User')
const verifyToken = require('../middleware/auth')



//@route get API
//@check xac thuc login
//access public
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await users.findById(req.userID).select('-password')
        if (!user) return res.status(400).json(
            {
                success: false,
                message: 'không có người dùng đăng nhập!'
            })
        res.json(
            {
                success: true,
                message: 'đã tìm thấy người dùng!',
                user
            }
        )
    } catch (error) {
        res.json({
            success: false,
            message: 'lỗi sever!'
        })
    }
})

// router.port('/', (req, res) => {
//     res.send('connect /api/auth')
// })

// @route api/auth/register
//@desc register user
//@access Public
router.post('/register', async (req, res) => {
    const { userName, password } = req.body
    try {
        //check validee
        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu trống!'
            })
        }
        const user = await users.findOne({ userName })
        //check tên đăng ký có tồn tại
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Tên đăng ký đã tồn tại'
            })
        }
        const hashedPassword = await argon2.hash(password)
        //đăng ký user
        const newUser = new users({ userName, password: hashedPassword })
        await newUser.save()
        const accessToken = jwt.sign({ userID: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
        return res.json({
            success: true,
            message: "Đăng ký thành công",
            accessToken
        })

    } catch (err) {
        res.json({
            success: false,
            message: "Đăng ký không thành công"
        })
    }
})

router.post('/login', async (req, res) => {
    const { userName, password } = req.body


    try {
        //check validee
        if (!userName || !password) {
            return res.status(400).json({
                success: false,
                message: 'Tên đăng nhập hoặc mật khẩu trống!'
            })
        }

        //check userName có tồn tại
        const user = await users.findOne({ userName })
        console.log(user)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Tên đăng nhập không tồn tại'
            })
        }

        //check password
        const passwordvalid = await argon2.verify(user.password, password)
        console.log(passwordvalid)
        if (!passwordvalid) {
            return res.status(400).json({
                success: false,
                message: 'Mật khẩu không chính xác!'
            })
        }

        //thành công login
        const accessToken = jwt.sign({ userID: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h',
          })
        return res.json({
            success: true,
            message: "Đăng nhập thành công",
            accessToken
        })
    } catch (err) {
        res.json({
            success: false,
            message: "Đăng ký không thành công"
        })
    }
})



module.exports = router