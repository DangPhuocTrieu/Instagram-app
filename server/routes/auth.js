import express from 'express'
import authController from '../controllers/auth.js'

const router = express.Router()

// REGISTER
router.post('/register', authController.registerUser)

// LOGIN
router.post('/login', authController.loginUser)

export default router