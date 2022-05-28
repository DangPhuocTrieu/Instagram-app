import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token) res.status(401).json({
        success: false,
        message: "You're not authenticated!"
    })

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = decoded

        next()
    } catch (error) {
        res.status(403).json({
            success: false,
            message: 'Token is not vaild!'
        })
    }
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json({ success: false, message: "You're not to allow to do that!" })
        }
    })
}
