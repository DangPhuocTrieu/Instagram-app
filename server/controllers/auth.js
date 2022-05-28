import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import userUtil from '../utils/user.js'

const authController = {
    generateAccessToken: user => {
        return jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.ACCESS_TOKEN_SECRET
        )
    },

    // REGISTER
    registerUser:  async (req, res) => {
        const { fullName, displayName, nameRegister } = req.body
        let newUser
        
        try {
            const validDisplayName = await User.findOne({ displayName })
            if(validDisplayName) return res.status(400).json({ success: false, message: 'Tên người dùng đã tồn tại.!' })

            const hashPassword = await argon2.hash(req.body.password)

            if(userUtil.checkEmailType(nameRegister)) {
                const validEmail = await User.findOne({ email: nameRegister })
                if(validEmail) return res.status(400).json({ success: false, message: 'Email đã có tài khoản sử dụng.!' })

                newUser = new User({
                    fullName,
                    password: hashPassword,
                    displayName,
                    email: nameRegister,
                })
            }
            else if(userUtil.checkPhoneNumberType(nameRegister)) {
                const validPhoneNumber = await User.findOne({ phoneNumber: nameRegister })
                if(validPhoneNumber) return res.status(400).json({ success: false, message: 'Số điện thoại đã có tài khoản sử dụng' })

                newUser = new User({
                    fullName,
                    password: hashPassword,
                    displayName,
                    phoneNumber: nameRegister,
                })
            }
            else {
                res.status(400).json({ success: false, message: 'Email hoặc số điện thoại không đúng định dạng.!' })
            }

            const registeredUser = await newUser.save()
            const { password, ...others } = registeredUser._doc
            
            res.status(200).json({ success: true, message: 'Đăng ký thành công!', user: others })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    },

    // LOGIN
    loginUser:  async (req, res) => {
        let user

        try {
            if(userUtil.checkEmailType(req.body.nameLogin)) {
                user = await User.findOne({ email: req.body.nameLogin })
                if(!user) return res.status(400).json({ 
                    success: false, 
                    message: 'Số điện thoại hoặc email không tồn tại. Vui lòng kiểm tra và thử lại.!' 
                })
            }
            else if(userUtil.checkPhoneNumberType(req.body.nameLogin)) {
                user = await User.findOne({ phoneNumber: req.body.nameLogin })
                if(!user) return res.status(400).json({ 
                    success: false, 
                    message: 'Số điện thoại hoặc email không tồn tại. Vui lòng kiểm tra và thử lại.!' 
                })
            }
            else {
                res.status(400).json({ success: false, message: 'Số điện thoại hoặc email không đúng định dạng.!' })
            }

            const validPassword = await argon2.verify(user.password, req.body.password)
            if(!validPassword) return res.status(400).json({ 
                success: false, 
                message: 'Rất tiếc, mật khẩu của bạn không đúng. Vui lòng kiểm tra lại mật khẩu.' 
            })

            const accessToken = authController.generateAccessToken(user)
            const { password, ...others } = user._doc
            res.status(200).json({ success: true,  user: { ...others, accessToken } })

        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }   
    }
}

export default authController